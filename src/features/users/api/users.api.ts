import { apiClient } from "@/lib/api/client";
import type {
  CreateUserPayload,
  CreateUserResponse,
  GetUsersParams,
  UsersResponse,
} from "@/features/users/types/user.types";

export async function getUsers(params: GetUsersParams = {}) {
  const { data } = await apiClient.get<UsersResponse>("api/users", { params });

  return data;
}

export async function createUser(payload: CreateUserPayload) {
  const { data } = await apiClient.post<CreateUserResponse>("api/users", payload);

  return data;
}
