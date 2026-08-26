import Link from "next/link";

import { Card, CardTitle } from "@/components/ui/card";
import { NavigationIcon } from "@/components/navigation/navigation-icon";
import type { NavigationItem } from "@/config/navigation";

type DashboardNavigationGridProps = Readonly<{
  items: readonly NavigationItem[];
  title: string;
}>;

export function DashboardNavigationGrid({ items, title }: DashboardNavigationGridProps) {
  return (
    <div className="min-h-full bg-main-bg px-5 pt-6 pb-8 lg:pr-4 lg:pl-0 xl:pr-7">
      <h1 className="sr-only">{title}</h1>

      <nav aria-label={title}>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 desktop:grid-cols-4">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Card className="h-31.75 gap-5.25 rounded-panel border border-border bg-background p-5 shadow-dashboard-card ring-0 transition-shadow hover:shadow-md">
                  <span className="grid size-10 shrink-0 place-items-center rounded-[13px] bg-primary text-primary-foreground">
                    <NavigationIcon icon={item.icon} className="size-5" />
                  </span>

                  <CardTitle className="font-sans text-[22px] leading-6.5 font-medium text-text-normal">
                    {item.title}
                  </CardTitle>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
