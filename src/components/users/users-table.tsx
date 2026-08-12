import type { User } from "@/features/users/types/user.types";
import { formatUserDate, getUserFullName } from "@/features/users/lib/user-formatters";
import { UserStatusBadge } from "./user-status-badge";
import { Button } from "../ui/button";

type UsersTableProps = {
  users: User[];
  isLoading: boolean;
  error?: string;
  rangeLabel: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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
}: UsersTableProps) {
  const shouldShowState = isLoading || error || users.length === 0;

  return (
    <div className="bg-background w-full overflow-hidden rounded-3xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="desktop:min-w-245 w-full min-w-190 table-fixed border-collapse font-sans">
          <UsersTableHead />

          <tbody>
            {shouldShowState ? (
              <UsersTableState isLoading={isLoading} error={error} />
            ) : (
              users.map((user) => <UsersTableRow key={user.id} user={user} />)
            )}
          </tbody>
        </table>
      </div>

      <UsersTableFooter
        rangeLabel={rangeLabel}
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

function UsersTableHead() {
  return (
    <thead className="bg-surface-muted">
      <tr className="text-text-heading h-12.5 text-left text-[14px] leading-4 font-bold">
        {columns.map((column) => (
          <th key={column.title} className={`${column.className} px-5`}>
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function UsersTableState({ isLoading, error }: { isLoading: boolean; error?: string }) {
  return (
    <tr>
      <td
        colSpan={columns.length}
        className="desktop:h-107.5 h-82.5 px-5 text-center font-sans text-[14px] leading-4"
      >
        {isLoading && <span className="text-text-muted">Завантаження...</span>}
        {error && <span className="text-text-error">{error}</span>}
        {!isLoading && !error && (
          <span className="text-text-muted">Користувачів не знайдено</span>
        )}
      </td>
    </tr>
  );
}

function UsersTableRow({ user }: { user: User }) {
  return (
    <tr className="border-border text-text-normal desktop:h-16 h-14 border-b text-[14px] leading-4 last:border-b-0">
      <td className="px-5">#{user.id}</td>

      <td className="px-5 font-medium">
        <span className="line-clamp-2">{getUserFullName(user)}</span>
      </td>

      <td className="px-5">{user.phone || "-"}</td>

      <td className="px-5">
        <span className="block truncate">{user.account?.email ?? "-"}</span>
      </td>

      <td className="px-5">
        <UserStatusBadge status={user.account?.status} />
      </td>

      <td className="px-5">{formatUserDate(user.created_at)}</td>

      <td className="px-5">
        <Button
          type="button"
          className="bg-muted text-text-muted hover:bg-primary hover:text-primary-foreground h-6 rounded-full px-3 text-[12px] font-bold transition-colors"
        >
          Редагувати
        </Button>
      </td>
    </tr>
  );
}

function UsersTableFooter({
  rangeLabel,
  page,
  totalPages,
  onPageChange,
}: {
  rangeLabel: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="border-border flex h-17 items-center justify-between border-t px-5">
      <p className="text-text-normal font-sans text-[14px] leading-4 font-bold">
        {rangeLabel}
      </p>

      <div className="flex items-center gap-2">
        <PaginationButton disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          ‹
        </PaginationButton>

        <Button
          type="button"
          className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-lg font-bold"
        >
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
      disabled={disabled}
      onClick={onClick}
      className="bg-muted text-primary grid size-8 place-items-center rounded-lg disabled:opacity-40"
    >
      {children}
    </Button>
  );
}
