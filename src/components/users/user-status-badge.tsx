import {
  getUserStatusLabel,
  normalizeUserStatus,
} from "@/features/users/lib/user-formatters";
import { cn } from "@/lib/utils";

type UserStatusBadgeProps = {
  status?: string;
};

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const normalizedStatus = normalizeUserStatus(status);

  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-full border px-2.5 font-sans text-[12px] leading-none font-bold",
        normalizedStatus === "ACTIVE" && "bg-success/15 text-success",
        normalizedStatus === "BLOCKED" &&
          "border-text-error/30 bg-text-error/10 text-text-error",
        normalizedStatus === "DELETED" &&
          "border-text-muted/30 bg-text-subtle/20 text-text-muted",
        normalizedStatus === "PENDING" && "border-info/35 bg-info/10 text-info",
      )}
    >
      {getUserStatusLabel(normalizedStatus)}
    </span>
  );
}
