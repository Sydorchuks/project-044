import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { navigationItems } from "@/config/navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-main-bg text-foreground grid min-h-dvh grid-cols-[95px_1fr] grid-rows-[78px_1fr] xl:grid-cols-[275px_1fr] xl:grid-rows-[94px_1fr]">
      <Header />

      <Sidebar items={navigationItems} />

      <main className="bg-main-bg col-start-2 row-start-2 min-w-0">{children}</main>
    </div>
  );
}
