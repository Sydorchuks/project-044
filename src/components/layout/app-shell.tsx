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
    <div className="grid min-h-dvh grid-rows-[78px_1fr] bg-main-bg text-foreground xl:grid-rows-[94px_1fr]">
      <Header />

      <div className="grid min-h-0 grid-cols-[95px_minmax(0,1fr)] xl:grid-cols-[275px_minmax(0,1fr)]">
        <Sidebar items={navigationItemsByVariant[variant]} showHelpCard={variant === "b2b"} />

        <main className="min-w-0 bg-main-bg">{children}</main>
      </div>
    </div>
  );
}
