import { WEEKDAYS } from "@/features/organizations/config/organization-form.config";
import type { Organization } from "@/features/organizations/schemas/organization.schema";
import type {
  OrganizationFormValues,
  OrganizationPayload,
  WorkingDayValues,
} from "@/features/organizations/types/organization-form.types";

const DEFAULT_WORKING_DAY: WorkingDayValues = {
  enabled: false,
  start: "",
  end: "",
};

export function getOrganizationFormValues(organization?: Organization): OrganizationFormValues {
  const workingHours = Object.fromEntries(
    WEEKDAYS.map(({ key }) => {
      const start = organization?.[`${key}_start_hours`];
      const end = organization?.[`${key}_end_hours`];
      const enabled = typeof start === "number" && typeof end === "number" && end > start;

      return [
        key,
        enabled ? { enabled, start: String(start), end: String(end) } : { ...DEFAULT_WORKING_DAY },
      ];
    }),
  ) as OrganizationFormValues["workingHours"];

  const isOpenAllDay = WEEKDAYS.every(({ key }) => {
    const day = workingHours[key];

    return day.enabled && day.start === "0" && day.end === "24";
  });

  return {
    name: organization?.name ?? "",
    description: organization?.description ?? "",
    phone: organization?.phone ?? "",
    address: organization?.address ?? "",
    isOpenAllDay,
    workingHours,
  };
}

export function toOrganizationPayload(values: OrganizationFormValues): OrganizationPayload {
  const workingHours = Object.fromEntries(
    WEEKDAYS.flatMap(({ key }) => {
      const day = values.workingHours[key];
      const start = values.isOpenAllDay ? 0 : day.enabled ? Number(day.start) : 0;
      const end = values.isOpenAllDay ? 24 : day.enabled ? Number(day.end) : 0;

      return [
        [`${key}_start_hours`, start],
        [`${key}_end_hours`, end],
      ];
    }),
  ) as Omit<OrganizationPayload, "name" | "description" | "phone" | "address">;

  return {
    name: values.name.trim(),
    description: values.description.trim(),
    phone: values.phone.trim(),
    address: values.address.trim(),
    ...workingHours,
  };
}
