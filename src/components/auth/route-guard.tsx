"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { getCurrentUser } from "@/features/auth/api/auth-api";
import { getUnauthorizedRoute } from "@/features/auth/config/route-access";
import { clearAuthTokens, getAccessToken } from "@/features/auth/lib/auth-storage";

type RouteGuardProps = Readonly<{
  children: ReactNode;
}>;

function subscribeToAuthStorage() {
  return () => undefined;
}

function getAccessTokenSnapshot() {
  return Boolean(getAccessToken());
}

function getServerAccessTokenSnapshot() {
  return null;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const hasAccessToken = useSyncExternalStore<boolean | null>(
    subscribeToAuthStorage,
    getAccessTokenSnapshot,
    getServerAccessTokenSnapshot,
  );

  const {
    data: account,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["auth", "current-account"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 0,
    refetchOnMount: "always",
    enabled: hasAccessToken === true,
  });

  const unauthorizedRoute = account ? getUnauthorizedRoute(account.role?.name, pathname) : null;

  useEffect(() => {
    if (hasAccessToken === false || isError) {
      clearAuthTokens();

      const currentRoute = window.location.pathname + window.location.search;

      router.replace(`/login?redirectTo=${encodeURIComponent(currentRoute)}`);
      return;
    }

    if (unauthorizedRoute) {
      router.replace(unauthorizedRoute);
    }
  }, [hasAccessToken, isError, router, unauthorizedRoute]);

  if (hasAccessToken !== true || isPending || isError || unauthorizedRoute) {
    return (
      <div className="grid min-h-dvh place-items-center bg-main-bg" role="status">
        <LoaderCircle aria-hidden="true" className="size-8 animate-spin text-primary" />
        <span className="sr-only">Перевірка доступу</span>
      </div>
    );
  }

  return children;
}
