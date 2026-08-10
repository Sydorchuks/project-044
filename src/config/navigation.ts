export type NavigationItem = {
  title: string;
  href: string;
  icon: string;
};

export const navigationItems: NavigationItem[] = [
  {
    title: "Головна",
    href: "/",
    icon: "/icons/home.svg",
  },
  {
    title: "Клієнти",
    href: "/clients",
    icon: "/icons/clients.svg",
  },
  {
    title: "Запити",
    href: "/requests",
    icon: "/icons/refresh.svg",
  },
];
