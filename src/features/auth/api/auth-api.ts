import { apiClient } from "@/lib/api/client";

import type { Account, LoginPayload, LoginResponse } from "@/features/auth/types/auth.types";

export async function login(payload: LoginPayload) {
  const { data } = await apiClient.post<LoginResponse>("api/auth/login", payload);

  return data;
}

export async function verifyAccount(verifyToken: string, newPassword: string) {
  const { data } = await apiClient.post<LoginResponse>(
    "api/auth/verify",
    { new_password: newPassword },
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    },
  );

  return data;
}

export async function getCurrentUser() {
  const { data } = await apiClient.get<Account>("api/auth/user");

  return data;
}

export async function logout() {
  await apiClient.delete("api/auth/logout");
}
