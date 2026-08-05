import { Button } from "@/components/ui/button";
import { CompanyMark } from "@/components/layout/company-mark";
import { UserAvatar } from "@/components/layout/user-avatar";

export function Header() {
  return (
    <header className="bg-secondary col-span-2 row-start-1 flex h-19.5 items-center justify-between px-5 py-4.25 xl:col-start-2 xl:col-end-3 xl:h-23.5 xl:justify-end xl:px-7">
      <CompanyMark className="xl:hidden" />

      <Button
        type="button"
        variant="ghost"
        className="group bg-background hover:bg-background h-13 w-64.5 justify-end rounded-[30px] p-2.5 shadow-sm transition-shadow hover:shadow-md xl:h-15 xl:w-60.5"
      >
        <span className="flex items-center gap-2.5">
          <span className="group-hover:text-primary font-sans text-[14px] leading-[140%] font-bold text-[#1C2127] transition-colors">
            User name
          </span>

          <UserAvatar />
        </span>
      </Button>
    </header>
  );
}
