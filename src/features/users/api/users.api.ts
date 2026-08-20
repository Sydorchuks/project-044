import { isAxiosError } from "axios";

import { userSchema, usersResponseSchema } from "@/features/users/schemas/user.schema";
import type {
  CreateUserPayload,
  CreateUserResponse,
  GetUsersParams,
  UpdateUserPayload,
  User,
  UsersResponse,
} from "@/features/users/types/user.types";
import { apiClient } from "@/lib/api/client";

export async function getUsers(params: GetUsersParams = {}): Promise<UsersResponse> {
  const { data } = await apiClient.get<unknown>("api/users", {
    params,
  });

  return usersResponseSchema.parse(data);
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

export async function getUser(id: number): Promise<User> {
  const { data } = await apiClient.get<unknown>(`api/users/${id}`);

  return userSchema.parse(data);
}

export async function updateUser(id: number, payload: UpdateUserPayload) {
  await apiClient.patch(`api/users/${id}`, payload);
}

export async function deleteUser(id: number) {
  await apiClient.delete(`api/users/${id}`);
}
