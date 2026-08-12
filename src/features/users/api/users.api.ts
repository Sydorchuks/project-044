import { apiClient } from "@/lib/api/client";
import type { GetUsersParams, UsersResponse } from "@/features/users/types/user.types";

export async function getUsers(params: GetUsersParams = {}) {
  const { data } = await apiClient.get<UsersResponse>("api/users", {
    params,
  });

  return data;
}
