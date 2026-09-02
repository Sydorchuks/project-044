import axios, { AxiosError } from "axios";
import { clearAuthTokens, getAccessToken } from "@/features/auth/lib/auth-storage";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const accessToken = getAccessToken();
    const authorization = error.config?.headers.Authorization;
    const usedAccessToken = accessToken && authorization === `Bearer ${accessToken}`;

    if (error.response?.status === 401 && usedAccessToken && typeof window !== "undefined") {
      clearAuthTokens();

      const currentPath = window.location.pathname + window.location.search;

      if (window.location.pathname !== "/login") {
        window.location.href = `/login?redirectTo=${encodeURIComponent(currentPath)}`;
      }
    }

    return Promise.reject(error);
  },
);
