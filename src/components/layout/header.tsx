import { CompanyMark } from "@/components/layout/company-mark";
import { SidebarDivider } from "@/components/layout/sidebar-divider";
import { UserAvatar } from "@/components/layout/user-avatar";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-19.5 items-center justify-between bg-main-bg px-5 py-4.25 xl:h-23.5 xl:pr-7 xl:pl-4.25">
      <div className="relative flex h-full items-center xl:w-58.25">
        <CompanyMark className="w-54.5 text-[22px] xl:ml-2.75" />

        <SidebarDivider className="absolute top-1/2 hidden translate-y-8.75 xl:block" />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="group h-13 w-64.5 justify-end rounded-[30px] bg-background p-2.5 shadow-sm transition-shadow hover:bg-background hover:shadow-md xl:h-15 xl:w-60.5"
      >
        <span className="flex items-center gap-2.5">
          <span className="font-sans text-[14px] leading-[140%] font-bold text-text-normal transition-colors group-hover:text-primary">
            User name
          </span>

          <UserAvatar />
        </span>
      </Button>
    </header>
  );
}
