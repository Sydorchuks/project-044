import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User } from "@/features/users/types/user.types";
import { formatUserDate, getUserFullName } from "@/features/users/lib/user-formatters";
import { UserStatusBadge } from "./user-status-badge";
import { cn } from "@/lib/utils";

type UsersTableProps = {
  users: User[];
  isLoading: boolean;
  error?: string;
  rangeLabel: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCreateUser: () => void;
};

const columns = [
  { title: "ID", className: "w-[8%]" },
  { title: "Імʼя", className: "w-[18%]" },
  { title: "Телефон", className: "w-[17%]" },
  { title: "Ел. пошта", className: "w-[24%]" },
  { title: "Статус", className: "w-[13%]" },
  { title: "Створено", className: "w-[13%]" },
  { title: "Дія", className: "w-[12%]" },
];

export function UsersTable({
  users,
  isLoading,
  error,
  rangeLabel,
  page,
  totalPages,
  onPageChange,
  onCreateUser,
}: UsersTableProps) {
  const hasStateRow = isLoading || error || users.length === 0;

  return (
    <div className="bg-background w-full overflow-hidden rounded-3xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="desktop:min-w-245 w-full min-w-190 table-fixed border-collapse font-sans">
          <thead className="bg-surface-muted">
            <tr className="text-text-heading h-12.5 text-left text-[14px] leading-4 font-bold">
              {columns.map((column) => (
                <th key={column.title} className={cn(column.className, "px-5")}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hasStateRow ? (
              <UsersTableState
                isLoading={isLoading}
                error={error}
                onCreateUser={onCreateUser}
              />
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-border text-text-normal desktop:h-16 h-14 border-b text-[14px] leading-4 last:border-b-0"
                >
                  <td className="px-5">#{user.id}</td>

                  <td className="px-5 font-medium">
                    <span className="line-clamp-2">{getUserFullName(user)}</span>
                  </td>

                  <td className="px-5">{user.phone || "-"}</td>

                  <td className="px-5">
                    <span className="block truncate">{user.account?.email ?? "-"}</span>
                  </td>

                  <td className="px-5">
                    <UserStatusBadge status={user.account?.status ?? ""} />
                  </td>

                  <td className="px-5">{formatUserDate(user.created_at)}</td>

                  <td className="px-5">
                    <Button
                      type="button"
                      variant="secondary"
                      className="bg-muted text-text-muted hover:bg-primary hover:text-primary-foreground h-6 rounded-full px-3 font-sans text-[12px] font-bold"
                    >
                      Редагувати
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="border-border flex h-17 items-center justify-between border-t px-5">
        <p className="text-text-normal font-sans text-[14px] leading-4 font-bold">
          {rangeLabel}
        </p>

        <div className="flex items-center gap-2">
          <PaginationButton disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            ‹
          </PaginationButton>

          <Button type="button" className="size-8 rounded-lg p-0 font-sans font-bold">
            {page}
          </Button>

          <PaginationButton
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            ›
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}

function UsersTableState({
  isLoading,
  error,
  onCreateUser,
}: {
  isLoading: boolean;
  error?: string;
  onCreateUser: () => void;
}) {
  return (
    <tr>
      <td
        colSpan={columns.length}
        className="desktop:h-107.5 h-82.5 px-5 text-center font-sans text-[14px] leading-4"
      >
        {isLoading && <span className="text-text-muted">Завантаження...</span>}

        {error && <span className="text-text-error">{error}</span>}

        {!isLoading && !error && (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-primary desktop:text-[18px] font-sans text-[16px] leading-5 font-bold">
              Нажаль ви ще не створили жодного користувача
            </p>

            <Button
              type="button"
              onClick={onCreateUser}
              className="h-8 rounded-3xl px-4 font-sans text-[12px] font-bold"
            >
              <Plus className="size-3.5" />
              Додати користувача
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
}

function PaginationButton({
  children,
  disabled,
  onClick,
}: {
  children: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="secondary"
      disabled={disabled}
      onClick={onClick}
      className="bg-muted text-primary size-8 rounded-lg p-0 font-sans disabled:opacity-40"
    >
      {children}
    </Button>
  );
}
