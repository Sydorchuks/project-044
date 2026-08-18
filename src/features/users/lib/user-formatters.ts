import { UserStatus, type User } from "@/features/users/types/user.types";

const USER_STATUS_LABELS: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "Активний",
  [UserStatus.BLOCKED]: "Заблоковано",
  [UserStatus.DELETED]: "Видалений",
  [UserStatus.PENDING]: "Розглядається",
};

export function getUserFullName(user: User) {
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");

  return fullName || "-";
}

export function formatUserDate(date?: string) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function getUserStatusLabel(status: UserStatus) {
  return USER_STATUS_LABELS[status];
}
