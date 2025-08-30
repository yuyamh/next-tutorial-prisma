import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  id: z.number().int(),
  name: z
    .string()
    .max(10, { message: "ユーザー名は10文字以内で入力してください" })
    .nullable()
    .optional(),
  role: z.enum(["USER", "ADMIN"]),
  // posts: z.array(z.any()),
});

export type User = z.infer<typeof UserSchema>;

export default UserSchema;
