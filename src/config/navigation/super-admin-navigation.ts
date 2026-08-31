import type { NavigationItemDefinition } from "@/config/navigation/navigation.types";

export const superAdminNavigationItems = [
  {
    title: "Головна",
    path: "/dashboard",
    icon: { type: "mask", src: "/icons/home.svg" },
    exact: true,
    showOnDashboard: false,
  },
  {
    title: "Користувачі",
    path: "/users",
    icon: { type: "mask", src: "/icons/mugshot.svg" },
    showOnDashboard: true,
  },
  {
    title: "Запити",
    path: "/requests",
    icon: { type: "mask", src: "/icons/refresh.svg" },
    showOnDashboard: true,
  },
] as const satisfies readonly NavigationItemDefinition[];
