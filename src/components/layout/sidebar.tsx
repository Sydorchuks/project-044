import { NavItem } from "@/components/layout/nav-item";
import { SidebarHelpCard } from "@/components/layout/sidebar-help-card";
import { NavigationIcon } from "@/components/navigation/navigation-icon";
import type { NavigationItem } from "@/config/navigation";

type SidebarProps = Readonly<{
  items: readonly NavigationItem[];
  showHelpCard: boolean;
}>;

export function Sidebar({ items, showHelpCard }: SidebarProps) {
  return (
    <aside className="h-full w-23.75 overflow-y-auto bg-main-bg px-5 py-6.25 xl:w-68.75 xl:px-4.25">
      <div className="flex min-h-full flex-col items-center justify-between xl:w-58.25">
        <div className="w-full shrink-0">
          <nav aria-label="Основна навігація">
            <ul className="flex w-13.75 flex-col gap-1 xl:w-54.75">
              {items.map((item) => (
                <li key={item.href}>
                  <NavItem
                    href={item.href}
                    icon={<NavigationIcon icon={item.icon} className="size-4" />}
                    title={item.title}
                    exact={item.exact}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {showHelpCard ? <SidebarHelpCard /> : null}
      </div>
    </aside>
  );
}
