import { CompanyMark } from "@/components/layout/company-mark";
import { NavItem } from "@/components/layout/nav-item";
import { SidebarDivider } from "@/components/layout/sidebar-divider";
import { SidebarHelpCard } from "@/components/layout/sidebar-help-card";
import { NavigationIcon } from "@/components/navigation/navigation-icon";
import type { AppShellVariant, NavigationItem } from "@/config/navigation";
import { cn } from "@/lib/utils";

type SidebarProps = Readonly<{
  items: readonly NavigationItem[];
  variant: AppShellVariant;
}>;

export function Sidebar({ items, variant }: SidebarProps) {
  const isB2B = variant === "b2b";

  return (
    <aside className="col-start-1 row-start-2 h-full w-23.75 overflow-y-auto bg-main-bg px-5 py-6.25 xl:row-span-2 xl:row-start-1 xl:w-68.75 xl:px-4.25">
      <div
        className={cn(
          "flex min-h-full flex-col xl:w-58.25",
          isB2B && "items-center justify-between",
        )}
      >
        <div className={cn("shrink-0", isB2B && "w-full")}>
          <div className="hidden xl:block">
            <div className={cn("mb-6.25 flex h-11 items-center", isB2B ? "px-3.5" : "px-3")}>
              <CompanyMark className={cn("w-54.5 text-[22px]", isB2B && "w-51.5")} />
            </div>

            <SidebarDivider className="mb-6.25" />
          </div>

          <nav aria-label="Основна навігація">
            <ul
              className={cn(
                "flex w-13.75 flex-col xl:w-54.75",
                isB2B ? "gap-0 xl:self-center" : "gap-1",
              )}
            >
              {items.map((item) => (
                <li key={item.href}>
                  <NavItem
                    href={item.href}
                    icon={<NavigationIcon icon={item.icon} className="size-4" />}
                    title={item.title}
                    variant={variant}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {isB2B ? <SidebarHelpCard /> : null}
      </div>
    </aside>
  );
}
