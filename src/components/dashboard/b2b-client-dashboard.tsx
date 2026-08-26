import { DashboardNavigationGrid } from "@/components/dashboard/dashboard-navigation-grid";
import { b2bClientDashboardItems } from "@/config/navigation";

export function B2BClientDashboard() {
  return <DashboardNavigationGrid items={b2bClientDashboardItems} title="B2B-панель" />;
}
