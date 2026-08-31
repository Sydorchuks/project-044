import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { getNavigationItems, type AppShellVariant } from "@/config/navigation";

type AppShellProps = Readonly<{
  children: ReactNode;
  scope: string;
  variant: AppShellVariant;
}>;

export function AppShell({ children, scope, variant }: AppShellProps) {
  return (
    <div className="grid min-h-dvh grid-rows-[78px_1fr] bg-main-bg text-foreground xl:grid-rows-[94px_1fr]">
      <Header />

      <div className="grid min-h-0 grid-cols-[95px_minmax(0,1fr)] xl:grid-cols-[275px_minmax(0,1fr)]">
        <Sidebar items={getNavigationItems(variant, scope)} showHelpCard={variant === "b2b"} />

        <main className="min-w-0 bg-main-bg">{children}</main>
      </div>
    </div>
  );
}
