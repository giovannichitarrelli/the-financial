import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { db } from "@/services/database";
import { AuthOptions } from "next-auth";
import { createStripeCustomer } from "@/services/stripe";
import EmailProvider from "next-auth/providers/email";

export const auth: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Adiciona o ID do usuário na sessão
      session.user.id = user.id;
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

// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { Adapter } from "next-auth/adapters";
// import { db } from "../database";
// import { createStripeCustomer } from "../stripe";

// export const authOptions: AuthOptions = {
//   adapter: PrismaAdapter(db) as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     async session({ session, user }) {
//       session.user = { ...session.user, id: user.id } as {
//         id: string;
//         name: string;
//         email: string;
//       };
//       return session;
//     },
//   },
//   events: {
//     createUser: async (message) => {
//       await createStripeCustomer({
//         email: message.user.email as string,
//         name: message.user.name as string,
//       });
//     },
//   },
//   secret: process.env.NEXT_AUTH_SECRET,
// };
// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { createStripeCustomer } from "../stripe";
// import GoogleProvider from "next-auth/providers/google";
// import { db } from "../database";
// import EmailProvider from "next-auth/providers/nodemailer";

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   pages: {
//     signIn: "/auth",
//     signOut: "/auth",
//     error: "/auth",
//     verifyRequest: "/auth",
//     newUser: "/app",
//   },
//   adapter: PrismaAdapter(db),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     EmailProvider({
//       server: process.env.EMAIL_SERVER,
//       from: process.env.EMAIL_FROM,
//     }),
//   ],

//   events: {
//     createUser: async (message) => {
//       await createStripeCustomer({
//         email: message.user.email as string,
//         name: message.user.name as string,
//       });
//     },
//   },
//   secret: process.env.NEXT_AUTH_SECRET,
//   trustHost: true,
// });
