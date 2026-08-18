import { createColumnHelper } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { dataTableFeatures } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { UserStatusBadge } from "@/components/users/user-status-badge";
import { formatUserDate, getUserFullName } from "@/features/users/lib/user-formatters";
import type { UsersSort, UsersSortField } from "@/features/users/hooks/use-users-page";
import type { User } from "@/features/users/types/user.types";
import { cn } from "@/lib/utils";

type CreateUsersTableColumnsOptions = {
  sort: UsersSort;
  onSortChange: (field: UsersSortField) => void;
};

type SortableColumnHeaderProps = {
  label: string;
  field: UsersSortField;
  sort: UsersSort;
  onSortChange: (field: UsersSortField) => void;
};

const columnHelper = createColumnHelper<typeof dataTableFeatures, User>();

export function createUsersTableColumns({
  sort,
  onSortChange,
}: CreateUsersTableColumnsOptions) {
  return columnHelper.columns([
    columnHelper.accessor("id", {
      header: () => (
        <SortableColumnHeader
          label="ID"
          field="id"
          sort={sort}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ getValue }) => `#${getValue()}`,
      meta: {
        headerClassName: "w-[8%]",
      },
    }),

    columnHelper.accessor((user) => getUserFullName(user), {
      id: "fullName",
      header: () => (
        <SortableColumnHeader
          label="Ім’я"
          field="first_name"
          sort={sort}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ getValue }) => (
        <span className="line-clamp-2 font-medium">{getValue()}</span>
      ),
      meta: {
        headerClassName: "w-[18%]",
      },
    }),

    columnHelper.accessor("phone", {
      header: "Телефон",
      cell: ({ getValue }) => getValue() || "-",
      meta: {
        headerClassName: "w-[17%]",
      },
    }),

    columnHelper.accessor((user) => user.account.email, {
      id: "email",
      header: () => (
        <SortableColumnHeader
          label="Ел. пошта"
          field="email"
          sort={sort}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ getValue }) => (
        <span className="block truncate">{getValue() || "-"}</span>
      ),
      meta: {
        headerClassName: "w-[24%]",
      },
    }),

    columnHelper.accessor((user) => user.account.status, {
      id: "status",
      header: "Статус",
      cell: ({ getValue }) => <UserStatusBadge status={getValue()} />,
      meta: {
        headerClassName: "w-[13%]",
      },
    }),

    columnHelper.accessor("created_at", {
      header: () => (
        <SortableColumnHeader
          label="Створено"
          field="created_at"
          sort={sort}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ getValue }) => formatUserDate(getValue()),
      meta: {
        headerClassName: "w-[13%]",
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "Дія",
      cell: () => (
        <Button
          type="button"
          className="bg-muted text-text-muted hover:bg-primary hover:text-primary-foreground h-6 rounded-full px-3 text-[12px] font-bold transition-colors"
        >
          Редагувати
        </Button>
      ),
      meta: {
        headerClassName: "w-[12%]",
      },
    }),
  ]);
}

function SortableColumnHeader({
  label,
  field,
  sort,
  onSortChange,
}: SortableColumnHeaderProps) {
  const [activeField, direction] = sort.split(":");

  const isActive = activeField === field;
  const isAscending = isActive && direction === "1";

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => onSortChange(field)}
      aria-label={`Сортувати за колонкою «${label}»`}
      className="h-auto w-full justify-between rounded-none p-0 text-left font-bold hover:bg-transparent"
    >
      <span>{label}</span>

      <ChevronDown
        aria-hidden="true"
        className={cn("size-4 shrink-0 transition-transform duration-200", {
          "text-primary": isActive,
          "text-text-muted": !isActive,
          "rotate-180": isAscending,
        })}
      />
    </Button>
  );
}
