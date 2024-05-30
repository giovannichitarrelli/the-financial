/* eslint-disable no-unused-vars */

import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
