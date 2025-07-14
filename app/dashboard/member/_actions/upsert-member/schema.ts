import { z } from "zod";

export const upsertMemberSchema = z.object({
  name: z.string().trim().min(1),
});
