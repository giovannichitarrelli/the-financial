import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { db } from "@/services/database";
import { AuthOptions } from "next-auth";
import { createStripeCustomer } from "@/services/stripe";
// import CredentialsProvider from "next-auth/providers/credentials";

export const auth: AuthOptions = {
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
    verifyRequest: "/auth",
    newUser: "/app",
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials) return null;
    //     const user = await db.user.findFirst({
    //       where: {
    //         email: credentials.email,
    //       },
    //     });
    //     if (user && user.password === credentials.password) {
    //       return { id: user.id, name: user.name, email: user.email };
    //     } else {
    //       return null;
    //     }
    //   },
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
