import { z } from "zod";

export const organizationSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  photo: z.string().nullable().optional(),
  phone: z.string(),
  address: z.string(),
  is_deleted: z.boolean(),
});

export const organizationsSchema = z.array(organizationSchema);

export type Organization = z.infer<typeof organizationSchema>;
