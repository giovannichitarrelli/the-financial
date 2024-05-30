export const config = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    webhookSecret: process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        priceId: "price_1PJInsJPcepMZEYbvLFwOxQ0",
        // priceId: "price_1PJLhlJPcepMZEYbw0ONVazb",
        // quota: {
        //   TASKS: 7,
        // },
      },
      pro: {
        priceId: "price_1PJOuLJPcepMZEYbLVLqjY4j",
        // priceId: "price_1PJLgyJPcepMZEYbOr69KWfF",
        // quota: {
        //   TASKS: 7,
        // },
      },
    },
  },
};
