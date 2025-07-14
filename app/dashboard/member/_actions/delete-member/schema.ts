import { z } from "zod";

export const deleteMemberSchema = z.object({
  memberId: z.string().cuid(),
});

export type DeleteMemberSchema = z.infer<typeof deleteMemberSchema>;
