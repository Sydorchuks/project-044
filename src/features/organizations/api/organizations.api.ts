import { organizationsSchema } from "@/features/organizations/schemas/organization.schema";
import type { Organization } from "@/features/organizations/types/organization.types";
import { apiClient } from "@/lib/api/client";

export async function getOrganizations(): Promise<Organization[]> {
  const { data } = await apiClient.get<unknown>("api/organization");

  return organizationsSchema.parse(data);
}
