import type { ReactNode } from "react";

import { AuthGuard } from "@/components/auth/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { B2B_ROLES } from "@/features/auth/config/route-access";

type B2BLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function B2BLayout({ children }: B2BLayoutProps) {
  return (
    <AuthGuard allowedRoles={B2B_ROLES} redirectTo="/dashboard">
      <AppShell variant="b2b">{children}</AppShell>
    </AuthGuard>
  );
}
