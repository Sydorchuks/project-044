import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AppQueryProvider } from "@/components/layout/app-query-provider";

type AppLayoutProps = Readonly<{ children: ReactNode }>;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppQueryProvider>
      <AppShell>{children}</AppShell>
    </AppQueryProvider>
  );
}
