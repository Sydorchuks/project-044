import type { LucideIcon } from "lucide-react";

export type AppShellVariant = "super-admin" | "b2b";

export type NavigationIcon =
  | Readonly<{
      type: "mask";
      src: string;
    }>
  | Readonly<{
      type: "component";
      component: LucideIcon;
    }>;

export type NavigationItem = Readonly<{
  title: string;
  href: string;
  icon: NavigationIcon;
  showOnDashboard: boolean;
}>;
