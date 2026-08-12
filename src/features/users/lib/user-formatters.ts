import type { User, UserStatus } from "@/features/users/types/user.types";

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

export function normalizeUserStatus(status?: string): UserStatus {
  return (status?.toUpperCase() || "PENDING") as UserStatus;
}

export function getUserStatusLabel(status?: string) {
  const normalizedStatus = normalizeUserStatus(status);

  const labels: Record<UserStatus, string> = {
    ACTIVE: "Активний",
    BLOCKED: "Заблоковано",
    DELETED: "Видалений",
    PENDING: "Розглядається",
  };

  return labels[normalizedStatus] ?? "Розглядається";
}
