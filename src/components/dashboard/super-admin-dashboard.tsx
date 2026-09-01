import { DashboardNavigationGrid } from "@/components/dashboard/dashboard-navigation-grid";
import { superAdminDashboardItems } from "@/config/navigation";

export function SuperAdminDashboard() {
  return <DashboardNavigationGrid items={superAdminDashboardItems} />;
}
