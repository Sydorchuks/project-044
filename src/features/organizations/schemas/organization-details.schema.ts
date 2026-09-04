import { z } from "zod";

export const organizationObjectSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  created_at: z.iso.datetime({ offset: true }),
  is_deleted: z.boolean(),
});

export const organizationStatisticsSchema = z.object({
  total_revenue: z.number(),
  total_reservations: z.number().int().nonnegative(),
});

export type OrganizationObject = z.infer<typeof organizationObjectSchema>;
