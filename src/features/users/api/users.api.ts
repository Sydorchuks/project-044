import { usersResponseSchema } from "@/features/users/schemas/user.schema";
import type { GetUsersParams, UsersResponse } from "@/features/users/types/user.types";
import { apiClient } from "@/lib/api/client";

export async function getUsers(params: GetUsersParams = {}): Promise<UsersResponse> {
  const { data } = await apiClient.get<unknown>("api/users", { params });

  return usersResponseSchema.parse(data);
}
