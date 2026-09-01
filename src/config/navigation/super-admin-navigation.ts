import type { NavigationItem } from "@/config/navigation/navigation.types";

export const superAdminNavigationItems = [
  {
    title: "Головна",
    href: "/dashboard",
    icon: { type: "mask", src: "/icons/home.svg" },
    exact: true,
    showOnDashboard: false,
  },
  {
    title: "Користувачі",
    href: "/users",
    icon: { type: "mask", src: "/icons/mugshot.svg" },
    showOnDashboard: true,
  },
  {
    title: "Запити",
    href: "/requests",
    icon: { type: "mask", src: "/icons/refresh.svg" },
    showOnDashboard: true,
  },
] as const satisfies readonly NavigationItem[];

export const superAdminDashboardItems: readonly NavigationItem[] = superAdminNavigationItems.filter(
  (item) => item.showOnDashboard,
);
