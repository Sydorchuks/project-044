import { z } from "zod";

import { UserStatus } from "@/features/users/types/user.types";

export const userStatusSchema = z
  .string()
  .transform((status) => status.trim().toUpperCase())
  .pipe(z.enum(UserStatus));

const userRoleSchema = z.object({ id: z.number(), name: z.string() });

const userAccountSchema = z.object({
  id: z.number(),
  email: z.string(),
  status: userStatusSchema,
  role: z.preprocess(
    (role) => (role === null ? undefined : role),
    userRoleSchema.optional(),
  ),
});

export const userSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  domain_url: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  account: userAccountSchema,
});

export const usersResponseSchema = z.object({
  filters: z.object({
    skip: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    search: z.string().optional(),
    sorted: z.string().optional(),
    total: z.coerce.number(),
    received: z.coerce.number(),
  }),
  data: z.array(userSchema),
});
