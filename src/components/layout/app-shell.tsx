import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { navigationItemsByVariant, type AppShellVariant } from "@/config/navigation";

type AppShellProps = Readonly<{
  children: ReactNode;
  variant: AppShellVariant;
}>;

export function AppShell({ children, variant }: AppShellProps) {
  return (
    <div className="grid min-h-dvh grid-cols-[95px_1fr] grid-rows-[78px_1fr] bg-main-bg text-foreground xl:grid-cols-[275px_1fr] xl:grid-rows-[94px_1fr]">
      <Header />

      <Sidebar items={navigationItemsByVariant[variant]} variant={variant} />

      <main className="col-start-2 row-start-2 min-w-0 bg-main-bg">{children}</main>
    </div>
  );
}
