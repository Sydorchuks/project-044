import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z.string().trim().nonempty("Введіть імʼя"),
  lastName: z.string().trim().nonempty("Введіть прізвище"),
  phone: z
    .string()
    .trim()
    .nonempty("Введіть номер телефону")
    .regex(/^\+380\d{9}$/, "Формат: +380501112233"),
  email: z
    .string()
    .trim()
    .nonempty("Введіть електронну пошту")
    .email("Некоректна електронна пошта"),
  domainUrl: z
    .string()
    .trim()
    .nonempty("Введіть slug компанії")
    .regex(/^[a-z0-9]+$/, "Тільки малі латинські літери та цифри"),
  description: z.string().trim(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
