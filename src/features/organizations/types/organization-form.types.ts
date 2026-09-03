import type { Weekday } from "@/features/organizations/config/organization-form.config";

export type WorkingDayValues = {
  enabled: boolean;
  start: string;
  end: string;
};

export type OrganizationFormValues = {
  name: string;
  description: string;
  phone: string;
  address: string;
  isOpenAllDay: boolean;
  workingHours: Record<Weekday, WorkingDayValues>;
};

export type OrganizationPayload = {
  name: string;
  description?: string;
  phone: string;
  address: string;
  monday_start_hours: number;
  monday_end_hours: number;
  tuesday_start_hours: number;
  tuesday_end_hours: number;
  wednesday_start_hours: number;
  wednesday_end_hours: number;
  thursday_start_hours: number;
  thursday_end_hours: number;
  friday_start_hours: number;
  friday_end_hours: number;
  saturday_start_hours: number;
  saturday_end_hours: number;
  sunday_start_hours: number;
  sunday_end_hours: number;
};
