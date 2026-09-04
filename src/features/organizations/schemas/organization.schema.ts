import { z } from "zod";

export const organizationSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  photo: z.string().nullable().optional(),
  phone: z.string(),
  address: z.string(),
  is_deleted: z.boolean(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  monday_start_hours: z.number().nullable().optional(),
  monday_end_hours: z.number().nullable().optional(),
  tuesday_start_hours: z.number().nullable().optional(),
  tuesday_end_hours: z.number().nullable().optional(),
  wednesday_start_hours: z.number().nullable().optional(),
  wednesday_end_hours: z.number().nullable().optional(),
  thursday_start_hours: z.number().nullable().optional(),
  thursday_end_hours: z.number().nullable().optional(),
  friday_start_hours: z.number().nullable().optional(),
  friday_end_hours: z.number().nullable().optional(),
  saturday_start_hours: z.number().nullable().optional(),
  saturday_end_hours: z.number().nullable().optional(),
  sunday_start_hours: z.number().nullable().optional(),
  sunday_end_hours: z.number().nullable().optional(),
});

export const organizationsSchema = z.array(organizationSchema);

export type Organization = z.infer<typeof organizationSchema>;
