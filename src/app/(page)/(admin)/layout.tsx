import type { ReactNode } from "react";

import { AuthGuard } from "@/components/auth/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { ADMIN_ROLES } from "@/features/auth/config/route-access";

type AdminLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthGuard allowedRoles={ADMIN_ROLES} redirectTo="/dashboard">
      <AppShell variant="super-admin">{children}</AppShell>
    </AuthGuard>
  );
}
