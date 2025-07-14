/* eslint-disable no-unused-vars */

import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    createAt: Date;
    password: string | null;
    username: string | null;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripeSubscriptionStatus: string | null;
    stripePriceId: string | null;
  }
}
