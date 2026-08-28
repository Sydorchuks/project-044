import type { ReactNode } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { AppQueryProvider } from "@/components/layout/app-query-provider";

type AppLayoutProps = Readonly<{ children: ReactNode }>;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppQueryProvider>
      <AuthGuard>{children}</AuthGuard>
    </AppQueryProvider>
  );
}
