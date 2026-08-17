import { isAxiosError } from "axios";

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

export async function createUser(
  payload: CreateUserPayload,
): Promise<CreateUserResponse> {
  try {
    const { data } = await apiClient.post<CreateUserResponse>("api/users", payload);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 500) {
      const createdUser = await findCreatedUser(payload.email);

      if (createdUser) {
        return {};
      }
    }

    throw error;
  }
}

async function findCreatedUser(email: string) {
  try {
    const users = await getUsers({
      limit: 100,
      skip: 0,
      sort: "id:-1",
    });

    return users.data.find((user) => user.account?.email === email);
  } catch {
    return undefined;
  }
}
