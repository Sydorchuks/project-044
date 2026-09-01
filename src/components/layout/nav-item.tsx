"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavItemProps = Readonly<{
  href: string;
  icon: ReactNode;
  title: string;
  exact?: boolean;
}>;

export function NavItem({ href, icon, title, exact = false }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (!exact && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group flex h-13.5 w-13.75 items-center justify-center rounded-panel px-3 py-3 font-sans text-[14px] leading-4 font-bold transition-colors xl:w-54.5 xl:justify-start xl:gap-3.75 xl:px-4",
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-transparent text-text-muted hover:bg-surface/45 hover:text-primary",
      )}
    >
      <span
        className={cn(
          "grid size-7.5 shrink-0 place-items-center rounded-4xl transition-colors",
          isActive ? "bg-surface-muted" : "bg-background",
        )}
      >
        <span
          className={cn(
            "transition-colors",
            isActive ? "text-primary" : "text-text-muted group-hover:text-primary",
          )}
        >
          {icon}
        </span>
      </span>

      <span className="hidden xl:inline">{title}</span>
    </Link>
  );
}
