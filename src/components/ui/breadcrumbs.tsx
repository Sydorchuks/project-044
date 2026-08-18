import Link from "next/link";

import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <div
      aria-label="Навігаційний шлях"
      className={cn("font-sans text-[12px] leading-4", className)}
    >
      <ul className="flex items-center gap-2">
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isCurrentPage ? (
                <Link
                  href={item.href}
                  className="text-text-muted hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isCurrentPage ? "page" : undefined}
                  className={cn({
                    "text-text-muted": !isCurrentPage,
                    "text-text-heading font-bold": isCurrentPage,
                  })}
                >
                  {item.label}
                </span>
              )}

              {!isCurrentPage && (
                <span aria-hidden="true" className="text-text-muted">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
