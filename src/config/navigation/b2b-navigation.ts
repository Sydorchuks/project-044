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
    href: "/dashboard",
    icon: { type: "component", component: House },
    exact: true,
    showOnDashboard: false,
  },
  {
    title: "Розклад",
    href: "/schedule",
    icon: { type: "component", component: CalendarDays },
    showOnDashboard: true,
  },
  {
    title: "Бронювання",
    href: "/reservations",
    icon: { type: "component", component: Waypoints },
    showOnDashboard: true,
  },
  {
    title: "Клієнти",
    href: "/clients",
    icon: { type: "component", component: UserRound },
    showOnDashboard: true,
  },
  {
    title: "Організації",
    href: "/organizations",
    icon: { type: "component", component: Grid3X3 },
    showOnDashboard: true,
  },
  {
    title: "Товари",
    href: "/products",
    icon: { type: "component", component: ShoppingBag },
    showOnDashboard: true,
  },
  {
    title: "Персонал",
    href: "/staff",
    icon: { type: "component", component: UsersRound },
    showOnDashboard: true,
  },
  {
    title: "Статистика",
    href: "/statistics",
    icon: { type: "component", component: ChartNoAxesColumnIncreasing },
    showOnDashboard: true,
  },
] as const satisfies readonly NavigationItem[];

export const b2bClientDashboardItems: readonly NavigationItem[] = b2bClientNavigationItems.filter(
  (item) => item.showOnDashboard,
);
