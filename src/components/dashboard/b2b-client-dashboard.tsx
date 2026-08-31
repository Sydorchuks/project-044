import { DashboardNavigationGrid } from "@/components/dashboard/dashboard-navigation-grid";
import { getDashboardNavigationItems } from "@/config/navigation";

type B2BClientDashboardProps = Readonly<{
  scope: string;
}>;

export function B2BClientDashboard({ scope }: B2BClientDashboardProps) {
  return <DashboardNavigationGrid items={getDashboardNavigationItems("b2b", scope)} />;
}
