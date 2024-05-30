import Stripe from "stripe";

import { config } from "@/config";
import { db } from "../prisma";

export const stripe = new Stripe(config.stripe.secretKey || "", {
  apiVersion: "2024-04-10",
  httpClient: Stripe.createFetchHttpClient(),
});

export const getStripeCustomerByEmail = async (email: string) => {
  const customers = await stripe.customers.list({ email });
  return customers.data[0];
};

export const createStripeCustomer = async (input: {
  name?: string;
  email: string;
}) => {
  const customer = await getStripeCustomerByEmail(input.email);
  if (customer) return customer;

  const createdCustomer = await stripe.customers.create({
    email: input.email,
    name: input.name,
  });

  const createdCustomerSubscription = await stripe.subscriptions.create({
    customer: createdCustomer.id,
    items: [{ price: config.stripe.plans.free.priceId }],
  });
  Prisma;
  await db.user.update({
    where: {
      email: input.email,
    },
    data: {
      stripeCustomerId: createdCustomer.id,
      stripeSubscriptionId: createdCustomerSubscription.id,
      stripeSubscriptionStatus: createdCustomerSubscription.status,
      stripePriceId: config.stripe.plans.free.priceId,
    },
  });

  return createdCustomer;
};

export const createCheckoutSession = async (
  userId: string,
  userEmail: string,
  userStripeSubscriptionId: string,
) => {
  try {
    const customer = await createStripeCustomer({
      email: userEmail,
    });

    const subscription = await stripe.subscriptionItems.list({
      subscription: userStripeSubscriptionId,
      limit: 1,
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: "http://localhost:3000/app/settings/billing",
      flow_data: {
        type: "subscription_update_confirm",
        after_completion: {
          type: "redirect",
          redirect: {
            return_url:
              "http://localhost:3000/app/settings/billing?success=true",
          },
        },
        subscription_update_confirm: {
          subscription: userStripeSubscriptionId,

          items: [
            {
              id: subscription.data[0].id,
              price: config.stripe.plans.pro.priceId,
              quantity: 1,
            },
          ],
        },
      },
    });

    return {
      url: session.url,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error to create checkout session");
  }
};

export const handleProcessWebhookUpdatedSubscription = async (event: {
  object: Stripe.Subscription;
}) => {
  const stripeCustomerId = event.object.customer as string;
  const stripeSubscriptionId = event.object.id as string;
  const stripeSubscriptionStatus = event.object.status;
  const stripePriceId = event.object.items.data[0].price.id;

  const userExists = await db.user.findFirst({
    where: {
      OR: [
        {
          stripeSubscriptionId,
        },
        {
          stripeCustomerId,
        },
      ],
    },
    select: {
      id: true,
    },
  });

  if (!userExists) {
    throw new Error("user of stripeCustomerId not found");
  }

  await db.user.update({
    where: {
      id: userExists.id,
    },
    data: {
      stripeCustomerId,
      stripeSubscriptionId,
      stripeSubscriptionStatus,
      stripePriceId,
    },
  });
};

type Plan = {
  priceId: string;
  // quota: {
  //   TASKS: number;
  // };
};

type Plans = {
  [key: string]: Plan;
};

export const getPlanByPrice = (priceId: string) => {
  const plans: Plans = config.stripe.plans;

  const planKey = Object.keys(plans).find(
    (key) => plans[key].priceId === priceId,
  ) as keyof Plans | undefined;

  const plan = planKey ? plans[planKey] : null;

  if (!plan) {
    throw new Error(`Plan not found for priceId: ${priceId}`);
  }

  return {
    name: planKey,
    // quota: plan.quota,
  };
};

export const getUserCurrentPlan = async (userId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripePriceId: true,
    },
  });

  if (!user || !user.stripePriceId) {
    throw new Error("User or user stripePriceId not found");
  }
  Prisma;
  const plan = getPlanByPrice(user.stripePriceId);

  // const tasksCount = await Prisma.expenses.count({
  //   where: {
  //     userId,
  //   },
  // });

  // const stripe = await Stripe.subs
  // const availableTasks = plan.quota.TASKS;
  // const currentTasks = tasksCount;
  // const usage = (currentTasks / availableTasks) * 100;

  return {
    name: plan.name,
    // quota: {
    //   TASKS: {
    //     available: availableTasks,
    //     current: currentTasks,
    //     usage,
    //   },
    // },
  };
};

// stripe checkout

// const session = await stripe.checkout.sessions.create({
//   payment_method_types: ["card"],
//   mode: "subscription",
//   client_reference_id: userId,
//   customer: customer.id,
//   success_url: "http://localhost:3000/app/settings/billing?success=true",
//   cancel_url: "http://localhost:3000/app/settings/billing?success=false",
//   line_items: [
//     {
//       price: config.stripe.plans.pro.priceId,
//       quantity: 1,
//     },
//   ],
//   subscription_data: {
//     trial_settings: {
//       end_behavior: {
//         missing_payment_method: "cancel",
//       },
//     },
//     trial_period_days: 0,
//   },
//   // payment_method_collection: 'if_required',
// });
