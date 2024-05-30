import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/_lib/prisma";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
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
  ],

  //   events: {
  //     createUser: async (message) => {
  //       await createStripeCustomer({
  //         email: message.user.email as string,
  //         name: message.user.name as string,
  //       });
  //     },
  //   },
  // secret: process.env.NEXT_AUTH_SECRET,
});
