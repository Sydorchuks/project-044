import { z } from "zod";

import {
  organizationObjectSchema,
  organizationStatisticsSchema,
} from "@/features/organizations/schemas/organization-details.schema";
import { apiClient } from "@/lib/api/client";

export async function getOrganizationObjects(id: number) {
  const { data } = await apiClient.get<unknown>(`api/organization/${id}/rental_objects`);

  return z
    .array(organizationObjectSchema)
    .parse(data)
    .filter((object) => !object.is_deleted);
}

export async function getOrganizationStatistics(id: number, startDate: string) {
  const { data } = await apiClient.get<unknown>(`api/organization/${id}/statistics`, {
    params: { start_date: startDate, end_date: new Date().toISOString() },
  });

  return organizationStatisticsSchema.parse(data);
}
