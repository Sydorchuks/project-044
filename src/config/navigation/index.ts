import { b2bClientNavigationItems } from "@/config/navigation/b2b-navigation";
import { superAdminNavigationItems } from "@/config/navigation/super-admin-navigation";
import type {
  AppShellVariant,
  NavigationItem,
  NavigationItemDefinition,
} from "@/config/navigation/navigation.types";
import { getScopedPath } from "@/lib/routes";

export type {
  AppShellVariant,
  NavigationIcon,
  NavigationItem,
  NavigationItemDefinition,
} from "@/config/navigation/navigation.types";

const navigationItemsByVariant: Readonly<
  Record<AppShellVariant, readonly NavigationItemDefinition[]>
> = {
  "super-admin": superAdminNavigationItems,
  b2b: b2bClientNavigationItems,
};

export function getNavigationItems(variant: AppShellVariant, scope: string) {
  return navigationItemsByVariant[variant].map<NavigationItem>(({ path, ...item }) => ({
    ...item,
    href: getScopedPath(scope, path),
  }));
}

export function getDashboardNavigationItems(variant: AppShellVariant, scope: string) {
  return getNavigationItems(variant, scope).filter((item) => item.showOnDashboard);
}
