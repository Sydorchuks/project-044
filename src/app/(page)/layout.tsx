import type { ReactNode } from "react";
import { RouteGuard } from "@/components/auth/route-guard";
import { AppQueryProvider } from "@/components/layout/app-query-provider";

type AppLayoutProps = Readonly<{ children: ReactNode }>;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppQueryProvider>
      <RouteGuard>{children}</RouteGuard>
    </AppQueryProvider>
  );
}
