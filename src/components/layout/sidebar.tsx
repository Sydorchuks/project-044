import { CompanyMark } from "@/components/layout/company-mark";
import { NavItem } from "@/components/layout/nav-item";
import { SidebarDivider } from "@/components/layout/sidebar-divider";
import { navigationItems } from "@/config/navigation";

export function Sidebar() {
  return (
    <aside className="bg-main-bg col-start-1 row-start-2 h-full w-23.75 px-5 py-6.25 xl:row-span-2 xl:row-start-1 xl:w-68.75 xl:px-4.25">
      <div className="flex h-full flex-col xl:w-58.25">
        <div className="hidden xl:block">
          <div className="mb-6.25 flex h-11 items-center px-3">
            <CompanyMark className="w-54.5 text-[22px]" />
          </div>

          <SidebarDivider className="mb-6.25" />
        </div>

        <nav className="flex w-13.75 flex-col gap-1 xl:w-54.75">
          {navigationItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
