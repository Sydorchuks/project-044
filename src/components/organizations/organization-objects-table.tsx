"use client";

import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, type ComponentProps } from "react";

import { DataTable, dataTableFeatures } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { getOrganizationObjects } from "@/features/organizations/api/organization-details.api";
import { formatOrganizationObjectDate } from "@/features/organizations/lib/organization-details.utils";
import type { OrganizationObject } from "@/features/organizations/schemas/organization-details.schema";
import { organizationObjectsSearchParamsSchema } from "@/features/organizations/schemas/organization-objects-search-params.schema";
import { useQueryParams } from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";

type OrganizationObjectsTableProps = { organizationId: number };

const PAGE_SIZE = 20;
const columnHelper = createColumnHelper<typeof dataTableFeatures, OrganizationObject>();

export function OrganizationObjectsTable({ organizationId }: OrganizationObjectsTableProps) {
  const { searchParams, updateQueryParams } = useQueryParams(organizationObjectsSearchParamsSchema);
  const { page, sortBy, sortDirection } = searchParams;
  const ascending = sortDirection === "ASC";
  const { data, isPending, isError, isFetching, refetch } = useQuery({
    queryKey: ["organizations", "objects", organizationId],
    queryFn: () => getOrganizationObjects(organizationId),
  });

  const objects = [...(data ?? [])].sort((a, b) => {
    const difference = new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime() || a.id - b.id;

    return ascending ? difference : -difference;
  });
  const totalPages = Math.max(1, Math.ceil(objects.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const offset = (currentPage - 1) * PAGE_SIZE;
  const visibleObjects = objects.slice(offset, offset + PAGE_SIZE);
  const isEmpty = !isPending && !isError && objects.length === 0;

  useEffect(() => {
    if (!isPending && !isError && page !== currentPage) {
      updateQueryParams({ page: currentPage }, { replace: true });
    }
  }, [isPending, isError, page, currentPage, updateQueryParams]);

  const columns = columnHelper.columns([
    columnHelper.accessor("id", {
      header: "Номер",
      meta: { headerClassName: "w-[11%]", cellClassName: "text-text-muted" },
    }),
    columnHelper.accessor("name", {
      header: "Назва об’єкта",
      cell: ({ getValue }) => (
        <span className="line-clamp-2 font-medium wrap-break-word">{getValue()}</span>
      ),
      meta: { headerClassName: "w-[37%]" },
    }),
    columnHelper.display({
      id: "sport",
      header: "Вид спорту",
      cell: () => <span aria-label="Вид спорту недоступний">—</span>,
      meta: { headerClassName: "w-[17%]" },
    }),
    columnHelper.accessor("created_at", {
      header: () => (
        <Button
          type="button"
          variant="ghost"
          aria-label={`Сортувати за датою: ${ascending ? "спочатку нові" : "спочатку старі"}`}
          onClick={() => {
            updateQueryParams({
              page: 1,
              sortBy: "created_at",
              sortDirection: ascending ? "DESC" : "ASC",
            });
          }}
          className="h-auto w-full justify-between rounded-none p-0 text-left font-bold hover:bg-transparent"
        >
          Дата
          <ChevronDown
            aria-hidden="true"
            className={cn("size-4 text-primary", ascending && "rotate-180")}
          />
        </Button>
      ),
      cell: ({ getValue }) => formatOrganizationObjectDate(getValue()),
      meta: { headerClassName: "w-[23%]" },
    }),
    columnHelper.display({
      id: "actions",
      header: "Дія",
      cell: () => (
        <Button
          type="button"
          disabled
          className="h-6 rounded-full bg-background-gray px-3 text-xs text-primary-foreground"
        >
          Відкрити
        </Button>
      ),
      meta: { headerClassName: "w-[12%]" },
    }),
  ]);

  return (
    <section aria-labelledby="organization-objects-title" className="min-w-0">
      <div className="flex min-h-135 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-organization-form">
        <div className="flex min-h-19 flex-wrap items-center justify-between gap-3 px-6 py-4.5">
          <h2
            id="organization-objects-title"
            className="text-lg leading-5 font-medium text-text-heading"
          >
            Об’єкти
          </h2>
          <AddObjectButton disabled />
        </div>
        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
            <p className="text-title leading-7 font-medium text-primary">
              На жаль, ви ще не створили жодного об’єкта
            </p>
            <AddObjectButton disabled />
          </div>
        ) : (
          <div className="flex-1 overflow-x-auto">
            <DataTable
              data={visibleObjects}
              columns={columns}
              isLoading={isPending}
              error={isError ? "Не вдалося завантажити об’єкти" : undefined}
              getRowId={(object) => String(object.id)}
            />
          </div>
        )}
        {isError ? (
          <Button
            type="button"
            variant="outline"
            disabled={isFetching}
            onClick={() => void refetch()}
            className="m-6 self-center"
          >
            Спробувати ще раз
          </Button>
        ) : !isPending && !isEmpty ? (
          <div className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4">
            <p className="text-sm font-medium text-text-heading">
              Показано {offset + 1}–{offset + visibleObjects.length} із {objects.length}
            </p>
            <nav aria-label="Сторінки об’єктів" className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={currentPage === 1}
                aria-label="Попередня сторінка"
                onClick={() => updateQueryParams({ page: currentPage - 1 })}
                className="size-8 bg-muted text-primary"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </Button>
              <span
                aria-current="page"
                aria-label={`Сторінка ${currentPage} з ${totalPages}`}
                className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-medium text-primary-foreground"
              >
                {currentPage}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={currentPage === totalPages}
                aria-label="Наступна сторінка"
                onClick={() => updateQueryParams({ page: currentPage + 1 })}
                className="size-8 bg-muted text-primary"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </Button>
            </nav>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function AddObjectButton({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      {...props}
      className={cn("h-10 rounded-2xl px-3.5 text-sm font-medium", className)}
    >
      <Plus aria-hidden="true" className="size-5" />
      Додати об’єкт
    </Button>
  );
}
