import { notFound } from "next/navigation";

import { B2BClientDashboard } from "@/components/dashboard/b2b-client-dashboard";
import { SuperAdminDashboard } from "@/components/dashboard/super-admin-dashboard";
import { getRouteScopeConfig, isRouteScope } from "@/features/auth/config/route-access";

type DashboardPageProps = Readonly<{
  params: Promise<{
    scope: string;
  }>;
}>;

const dashboardByVariant = {
  "super-admin": SuperAdminDashboard,
  b2b: B2BClientDashboard,
} as const;

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { scope } = await params;

  if (!isRouteScope(scope)) {
    notFound();
  }

  const Dashboard = dashboardByVariant[getRouteScopeConfig(scope).shellVariant];

  return <Dashboard scope={scope} />;
}
