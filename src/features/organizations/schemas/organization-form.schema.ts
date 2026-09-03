import { z } from "zod";

import { WEEKDAYS } from "@/features/organizations/config/organization-form.config";
import type { OrganizationFormValues } from "@/features/organizations/types/organization-form.types";

const workingDaySchema = z.object({
  enabled: z.boolean(),
  start: z.string(),
  end: z.string(),
});

const workingHoursSchema = z.object({
  monday: workingDaySchema,
  tuesday: workingDaySchema,
  wednesday: workingDaySchema,
  thursday: workingDaySchema,
  friday: workingDaySchema,
  saturday: workingDaySchema,
  sunday: workingDaySchema,
});

export const organizationFormSchema: z.ZodType<OrganizationFormValues> = z
  .object({
    name: z.string().trim().nonempty("Введіть назву організації"),
    description: z.string().trim(),
    phone: z
      .string()
      .trim()
      .nonempty("Введіть номер телефону")
      .regex(/^\+380\d{9}$/, "Формат: +380501112233"),
    address: z.string().trim().nonempty("Введіть місцезнаходження"),
    isOpenAllDay: z.boolean(),
    workingHours: workingHoursSchema,
  })
  .superRefine((values, context) => {
    if (values.isOpenAllDay) {
      return;
    }

    WEEKDAYS.forEach(({ key }) => {
      const day = values.workingHours[key];

      if (!day.enabled) {
        return;
      }

      if (day.start === "" || day.end === "") {
        context.addIssue({
          code: "custom",
          message: "Виберіть години роботи",
          path: ["workingHours"],
        });
        return;
      }

      const start = Number(day.start);
      const end = Number(day.end);

      if (
        !/^\d+$/.test(day.start) ||
        !/^\d+$/.test(day.end) ||
        !Number.isInteger(start) ||
        !Number.isInteger(end) ||
        start < 0 ||
        start > 23 ||
        end < 1 ||
        end > 24
      ) {
        context.addIssue({
          code: "custom",
          message: "Виберіть цілі години: початок від 0 до 23, завершення від 1 до 24",
          path: ["workingHours"],
        });
        return;
      }

      if (end <= start) {
        context.addIssue({
          code: "custom",
          message: "Час завершення має бути пізніше за час початку",
          path: ["workingHours"],
        });
      }
    });
  });
