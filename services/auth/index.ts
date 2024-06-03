import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { db } from "@/services/database";
import { AuthOptions } from "next-auth";
import { createStripeCustomer } from "@/services/stripe";
// import EmailProvider from "next-auth/providers/email";

export const auth: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.name = user.name;
      session.user.email = user.email;
      session.user.emailVerified = user.emailVerified;
      session.user.image = user.image;
      session.user.createAt = user.createAt;
      session.user.username = user.username;
      session.user.stripeCustomerId = user.stripeCustomerId;
      session.user.stripeSubscriptionId = user.stripeSubscriptionId;
      session.user.stripeSubscriptionStatus = user.stripeSubscriptionStatus;
      session.user.stripePriceId = user.stripePriceId;
      return session;
    },
  },
  events: {
    createUser: async (message) => {
      await createStripeCustomer({
        email: message.user.email as string,
        name: message.user.name as string,
      });
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
