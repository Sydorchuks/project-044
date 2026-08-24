import { CompanyMark } from "@/components/layout/company-mark";
import { UserAvatar } from "@/components/layout/user-avatar";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="col-span-2 row-start-1 flex h-19.5 items-center justify-between bg-main-bg px-5 py-4.25 xl:col-start-2 xl:col-end-3 xl:h-23.5 xl:justify-end xl:px-7">
      <CompanyMark className="xl:hidden" />

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
