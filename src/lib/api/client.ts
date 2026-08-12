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

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearAuthTokens();

      const currentPath = window.location.pathname + window.location.search;

      if (window.location.pathname !== "/login") {
        window.location.href = `/login?redirectTo=${encodeURIComponent(currentPath)}`;
      }
    }

    return Promise.reject(error);
  },
);
