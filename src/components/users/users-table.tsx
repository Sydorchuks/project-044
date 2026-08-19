"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import { DataTable } from "@/components/data-table";
import { createUsersTableColumns } from "@/components/users/users-table-columns";
import type { User } from "@/features/users/types/user.types";
import { useQueryParams } from "@/hooks/use-query-params";
import {
  UsersSort,
  UsersSortField,
} from "@/features/users/schemas/use-search-params.schema";

type UsersTableProps = {
  users: User[];
  isLoading: boolean;
  error?: string;
  rangeLabel: string;
  page: number;
  totalPages: number;
  sort: UsersSort;
  onSortChange: (field: UsersSortField) => void;
};

export function UsersTable({
  users,
  isLoading,
  error,
  rangeLabel,
  page,
  totalPages,
  sort,
  onSortChange,
}: UsersTableProps) {
  const columns = useMemo(
    () =>
      createUsersTableColumns({
        sort,
        onSortChange,
      }),
    [sort, onSortChange],
  );

  return (
    <div className="bg-background w-full overflow-hidden rounded-3xl shadow-sm">
      <div className="overflow-x-auto">
        <DataTable<User>
          data={users}
          columns={columns}
          isLoading={isLoading}
          error={error}
          emptyMessage="Користувачів не знайдено"
          getRowId={(user) => String(user.id)}
        />
      </div>

      <UsersTableFooter rangeLabel={rangeLabel} page={page} totalPages={totalPages} />
    </div>
  );
}

type UsersTableFooterProps = {
  rangeLabel: string;
  page: number;
  totalPages: number;
};

function UsersTableFooter({ rangeLabel, page, totalPages }: UsersTableFooterProps) {
  const { getQueryParamsHref } = useQueryParams();
  const paginationItems = getPaginationItems(page, totalPages);

  function getPageHref(nextPage: number) {
    return getQueryParamsHref({
      page: nextPage <= 1 ? null : nextPage,
    });
  }

  return (
    <div className="border-border flex h-17 items-center justify-between border-t px-5">
      <p className="text-text-normal font-sans text-[14px] leading-4 font-bold">
        {rangeLabel}
      </p>

      <nav aria-label="Пагінація">
        <ul className="flex items-center gap-2">
          <li>
            <PaginationButton
              href={page > 1 ? getPageHref(page - 1) : undefined}
              disabled={page <= 1}
              ariaLabel="Попередня сторінка"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </PaginationButton>
          </li>

          {paginationItems.map((item) => {
            if (typeof item !== "number") {
              return (
                <li
                  key={item}
                  aria-hidden="true"
                  className="text-text-muted grid size-8 place-items-center text-[14px] font-bold"
                >
                  ...
                </li>
              );
            }

            return (
              <li key={item}>
                <PaginationButton
                  href={getPageHref(item)}
                  active={item === page}
                  ariaLabel={`Сторінка ${item}`}
                >
                  {item}
                </PaginationButton>
              </li>
            );
          })}

          <li>
            <PaginationButton
              href={page < totalPages ? getPageHref(page + 1) : undefined}
              disabled={page >= totalPages}
              ariaLabel="Наступна сторінка"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </PaginationButton>
          </li>
        </ul>
      </nav>
    </div>
  );
}

type PaginationButtonProps = {
  href?: string;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  ariaLabel: string;
};

function PaginationButton({
  href,
  children,
  active = false,
  disabled = false,
  ariaLabel,
}: PaginationButtonProps) {
  const className = [
    "grid size-8 place-items-center rounded-lg text-[14px] font-bold transition-colors",
    "focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2",
    active
      ? "bg-primary text-primary-foreground"
      : "bg-muted text-primary hover:bg-primary hover:text-primary-foreground",
    disabled ? "pointer-events-none opacity-40" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (disabled || !href) {
    return (
      <span aria-disabled="true" aria-label={ariaLabel} className={className}>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      scroll={false}
      className={className}
    >
      {children}
    </Link>
  );
}

type PaginationItem = number | `ellipsis-${number}`;

function getPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount = 2,
): PaginationItem[] {
  const normalizedTotal = Math.max(1, totalPages);
  const normalizedCurrent = Math.min(Math.max(1, currentPage), normalizedTotal);
  const visiblePages = new Set<number>([1]);

  for (
    let item = normalizedCurrent - siblingCount;
    item <= normalizedCurrent + siblingCount;
    item += 1
  ) {
    if (item >= 1 && item <= normalizedTotal) {
      visiblePages.add(item);
    }
  }

  visiblePages.add(normalizedTotal);
  const pages = [...visiblePages];

  if (pages.length === 1) {
    return pages;
  }

  const lastIndex = pages.length - 1;
  const items: PaginationItem[] = [pages[0]];
  const firstGap = pages[1] - pages[0];

  if (firstGap === 2) {
    items.push(pages[0] + 1);
  } else if (firstGap > 2) {
    items.push(`ellipsis-${pages[1]}`);
  }

  items.push(...pages.slice(1, lastIndex));

  if (lastIndex > 1) {
    const lastGap = pages[lastIndex] - pages[lastIndex - 1];
    if (lastGap === 2) {
      items.push(pages[lastIndex - 1] + 1);
    } else if (lastGap > 2) {
      items.push(`ellipsis-${pages[lastIndex]}`);
    }
  }
  items.push(pages[lastIndex]);
  return items;
}
