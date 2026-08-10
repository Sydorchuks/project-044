import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Введіть електронну пошту")
    .email("Некоректна електронна пошта"),

  password: z.string().min(1, "Введіть пароль"),

  remember: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
