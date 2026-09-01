import { b2bClientNavigationItems } from "@/config/navigation/b2b-navigation";
import { superAdminNavigationItems } from "@/config/navigation/super-admin-navigation";
import type { AppShellVariant, NavigationItem } from "@/config/navigation/navigation.types";

export { b2bClientDashboardItems } from "@/config/navigation/b2b-navigation";
export { superAdminDashboardItems } from "@/config/navigation/super-admin-navigation";
export type {
  AppShellVariant,
  NavigationIcon,
  NavigationItem,
} from "@/config/navigation/navigation.types";

export const navigationItemsByVariant: Readonly<
  Record<AppShellVariant, readonly NavigationItem[]>
> = {
  "super-admin": superAdminNavigationItems,
  b2b: b2bClientNavigationItems,
};
