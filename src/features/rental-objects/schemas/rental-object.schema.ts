import { z } from "zod";

import { organizationSchema } from "@/features/organizations/schemas/organization.schema";

export const rentalObjectSchema = organizationSchema.extend({
  organization: organizationSchema.pick({ id: true, name: true, is_deleted: true }),
  price_per_hour: z.number().nonnegative(),
  total_reservation_sum: z.number().nonnegative(),
  total_reservation_amount: z.number().int().nonnegative(),
  total_clients_amount: z.number().int().nonnegative(),
});

export type RentalObject = z.infer<typeof rentalObjectSchema>;
