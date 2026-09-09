import { z } from "zod";

import { organizationSchema } from "@/features/organizations/schemas/organization.schema";

const rentalObjectApiSchema = organizationSchema.extend({
  organization: organizationSchema.pick({ id: true, name: true, is_deleted: true }),
  price_per_hour: z.number().nonnegative(),
  total_reservation_sum: z.number().nonnegative(),
  total_reservation_amount: z.number().int().nonnegative(),
  total_clients_amount: z.number().int().nonnegative(),
});

export const rentalObjectSchema = rentalObjectApiSchema.transform(
  ({
    is_deleted,
    created_at,
    price_per_hour,
    total_reservation_sum,
    total_reservation_amount,
    total_clients_amount,
    organization,
    monday_start_hours,
    monday_end_hours,
    tuesday_start_hours,
    tuesday_end_hours,
    wednesday_start_hours,
    wednesday_end_hours,
    thursday_start_hours,
    thursday_end_hours,
    friday_start_hours,
    friday_end_hours,
    saturday_start_hours,
    saturday_end_hours,
    sunday_start_hours,
    sunday_end_hours,
    ...object
  }) => ({
    ...object,
    isDeleted: is_deleted,
    createdAt: created_at,
    pricePerHour: price_per_hour,
    totalReservationSum: total_reservation_sum,
    totalReservationAmount: total_reservation_amount,
    totalClientsAmount: total_clients_amount,
    organization: {
      id: organization.id,
      name: organization.name,
      isDeleted: organization.is_deleted,
    },
    workingHours: {
      monday: { start: monday_start_hours, end: monday_end_hours },
      tuesday: { start: tuesday_start_hours, end: tuesday_end_hours },
      wednesday: { start: wednesday_start_hours, end: wednesday_end_hours },
      thursday: { start: thursday_start_hours, end: thursday_end_hours },
      friday: { start: friday_start_hours, end: friday_end_hours },
      saturday: { start: saturday_start_hours, end: saturday_end_hours },
      sunday: { start: sunday_start_hours, end: sunday_end_hours },
    },
  }),
);

export type RentalObject = z.infer<typeof rentalObjectSchema>;
