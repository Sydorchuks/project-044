"use client";

import { AuthGuard, useAuthenticatedAccount } from "@/components/auth/auth-guard";
import { B2BClientDashboard } from "@/components/dashboard/b2b-client-dashboard";
import { SuperAdminDashboard } from "@/components/dashboard/super-admin-dashboard";
import { AppShell } from "@/components/layout/app-shell";
import { AUTHENTICATED_ROLES, getDashboardVariant } from "@/features/auth/config/route-access";

const dashboardByVariant = {
  "super-admin": SuperAdminDashboard,
  b2b: B2BClientDashboard,
} as const;

export default function DashboardPage() {
  return (
    <AuthGuard allowedRoles={AUTHENTICATED_ROLES} redirectTo="/login">
      <RoleDashboard />
    </AuthGuard>
  );
}

function RoleDashboard() {
  const account = useAuthenticatedAccount();
  const variant = getDashboardVariant(account.role?.name);

  if (!variant) {
    return null;
  }

  const Dashboard = dashboardByVariant[variant];

  return (
    <AppShell variant={variant}>
      <Dashboard />
    </AppShell>
  );
}
