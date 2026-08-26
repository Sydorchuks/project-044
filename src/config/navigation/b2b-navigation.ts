import {
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Grid3X3,
  House,
  ShoppingBag,
  UserRound,
  UsersRound,
  Waypoints,
} from "lucide-react";

import type { NavigationItem } from "@/config/navigation/navigation.types";

export const b2bClientNavigationItems = [
  {
    title: "Головна",
    href: "/b2b/dashboard",
    icon: { type: "component", component: House },
    showOnDashboard: false,
  },
  {
    title: "Розклад",
    href: "/b2b/schedule",
    icon: { type: "component", component: CalendarDays },
    showOnDashboard: true,
  },
  {
    title: "Бронювання",
    href: "/b2b/reservations",
    icon: { type: "component", component: Waypoints },
    showOnDashboard: true,
  },
  {
    title: "Клієнти",
    href: "/b2b/clients",
    icon: { type: "component", component: UserRound },
    showOnDashboard: true,
  },
  {
    title: "Організації",
    href: "/b2b/organizations",
    icon: { type: "component", component: Grid3X3 },
    showOnDashboard: true,
  },
  {
    title: "Товари",
    href: "/b2b/products",
    icon: { type: "component", component: ShoppingBag },
    showOnDashboard: true,
  },
  {
    title: "Персонал",
    href: "/b2b/staff",
    icon: { type: "component", component: UsersRound },
    showOnDashboard: true,
  },
  {
    title: "Статистика",
    href: "/b2b/statistics",
    icon: { type: "component", component: ChartNoAxesColumnIncreasing },
    showOnDashboard: true,
  },
] as const satisfies readonly NavigationItem[];

export const b2bClientDashboardItems: readonly NavigationItem[] = b2bClientNavigationItems.filter(
  (item) => item.showOnDashboard,
);
