"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { MaskIcons } from "@/components/mask-icons";

type NavItemProps = {
  item: NavigationItem;
};

export function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex h-13.5 items-center rounded-[15px] px-3 py-3 font-sans text-[14px] leading-4 font-bold transition-colors",
        "w-13.75 justify-center",
        "xl:w-54.5 xl:justify-start xl:gap-3.75 xl:px-4",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:text-primary bg-transparent text-[#738091] hover:bg-white/45",
      )}
    >
      <span
        className={cn(
          "grid size-7.5 shrink-0 place-items-center rounded-4xl transition-colors",
          isActive ? "bg-[#F6F7F9]" : "bg-background",
        )}
      >
        <MaskIcons
          src={item.icon}
          className={cn(
            "size-4 bg-current transition-colors",
            isActive ? "text-primary" : "group-hover:text-primary text-[#738091]",
          )}
        />
      </span>

      <span className="hidden xl:inline">{item.title}</span>
    </Link>
  );
}
