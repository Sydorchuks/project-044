import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().trim().min(1, "Введіть імʼя"),
  lastName: z.string().trim().min(1, "Введіть прізвище"),

  phone: z
    .string()
    .trim()
    .min(1, "Введіть номер телефону")
    .regex(/^\+380\d{9}$/, "Формат: +380501112233"),

  email: z
    .string()
    .trim()
    .min(1, "Введіть електронну пошту")
    .email("Некоректна електронна пошта"),

  domainUrl: z
    .string()
    .trim()
    .min(1, "Введіть назву компанії")
    .regex(/^[a-z0-9]+$/, "Тільки малі латинські літери та цифри"),

  description: z.string().trim(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
