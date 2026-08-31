import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { getRouteScopeConfig, isRouteScope } from "@/features/auth/config/route-access";

type ScopedLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{
    scope: string;
  }>;
}>;

export default async function ScopedLayout({ children, params }: ScopedLayoutProps) {
  const { scope } = await params;

  if (!isRouteScope(scope)) {
    notFound();
  }

  return (
    <AppShell scope={scope} variant={getRouteScopeConfig(scope).shellVariant}>
      {children}
    </AppShell>
  );
}
