import { z } from "zod";

export const activateAccountSchema = z
  .object({
    password: z.string().min(8, "Пароль має містити щонайменше 8 символів"),
    confirmPassword: z.string().min(1, "Підтвердіть пароль"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Паролі не збігаються",
    path: ["confirmPassword"],
  });

export type ActivateAccountFormValues = z.infer<typeof activateAccountSchema>;
