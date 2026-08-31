import { DashboardNavigationGrid } from "@/components/dashboard/dashboard-navigation-grid";
import { getDashboardNavigationItems } from "@/config/navigation";

type SuperAdminDashboardProps = Readonly<{
  scope: string;
}>;

export function SuperAdminDashboard({ scope }: SuperAdminDashboardProps) {
  return <DashboardNavigationGrid items={getDashboardNavigationItems("super-admin", scope)} />;
}
