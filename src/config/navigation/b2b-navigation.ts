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

import type { NavigationItemDefinition } from "@/config/navigation/navigation.types";

export const b2bClientNavigationItems = [
  {
    title: "Головна",
    path: "/dashboard",
    icon: { type: "component", component: House },
    exact: true,
    showOnDashboard: false,
  },
  {
    title: "Розклад",
    path: "/schedule",
    icon: { type: "component", component: CalendarDays },
    showOnDashboard: true,
  },
  {
    title: "Бронювання",
    path: "/reservations",
    icon: { type: "component", component: Waypoints },
    showOnDashboard: true,
  },
  {
    title: "Клієнти",
    path: "/clients",
    icon: { type: "component", component: UserRound },
    showOnDashboard: true,
  },
  {
    title: "Організації",
    path: "/organizations",
    icon: { type: "component", component: Grid3X3 },
    showOnDashboard: true,
  },
  {
    title: "Товари",
    path: "/products",
    icon: { type: "component", component: ShoppingBag },
    showOnDashboard: true,
  },
  {
    title: "Персонал",
    path: "/staff",
    icon: { type: "component", component: UsersRound },
    showOnDashboard: true,
  },
  {
    title: "Статистика",
    path: "/statistics",
    icon: { type: "component", component: ChartNoAxesColumnIncreasing },
    showOnDashboard: true,
  },
] as const satisfies readonly NavigationItemDefinition[];
