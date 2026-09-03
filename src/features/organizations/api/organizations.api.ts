import { z } from "zod";

import {
  type Organization,
  organizationSchema,
  organizationsSchema,
} from "@/features/organizations/schemas/organization.schema";
import type { OrganizationPayload } from "@/features/organizations/types/organization-form.types";
import { apiClient } from "@/lib/api/client";

export async function getOrganizations(): Promise<Organization[]> {
  const { data } = await apiClient.get<unknown>("api/organization");

  return organizationsSchema.parse(data);
}

export async function getOrganization(id: number): Promise<Organization> {
  const { data } = await apiClient.get<unknown>(`api/organization/${id}`);

  return organizationSchema.parse(data);
}

export async function createOrganization(payload: OrganizationPayload): Promise<Organization> {
  const { data } = await apiClient.post<unknown>("api/organization", payload);

  return organizationSchema.parse(data);
}

export async function updateOrganization(
  id: number,
  payload: OrganizationPayload,
): Promise<Organization> {
  const { data } = await apiClient.patch<unknown>(`api/organization/${id}`, payload);
  const result = zOrganizationMutationResponse.parse(data);

  return Array.isArray(result) ? result[0] : result;
}

export async function uploadOrganizationImage(id: number, file: File) {
  const formData = new FormData();

  formData.append("file", file);
  await apiClient.putForm(`api/organization/${id}/upload/image`, formData);
}

export async function deleteOrganization(id: number) {
  await apiClient.delete(`api/organization/${id}`);
}

export async function deleteOrganizationImage(id: number) {
  await apiClient.put(`api/organization/${id}/delete/image`);
}

const zOrganizationMutationResponse = organizationSchema.or(z.array(organizationSchema).min(1));
