import { getUserStatusLabel } from "@/features/users/lib/user-formatters";
import { UserStatus } from "@/features/users/types/user.types";
import { cn } from "@/lib/utils";

const USER_STATUS_CLASSES: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "bg-success/15 text-success",
  [UserStatus.BLOCKED]: "border-text-error/30 bg-text-error/10 text-text-error",
  [UserStatus.DELETED]: "border-text-muted/30 bg-text-subtle/20 text-text-muted",
  [UserStatus.PENDING]: "border-info/35 bg-info/10 text-info",
};

type UserStatusBadgeProps = {
  status: UserStatus;
};

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-full border px-2.5 font-sans text-[12px] leading-none font-bold",
        USER_STATUS_CLASSES[status],
      )}
    >
      {getUserStatusLabel(status)}
    </span>
  );
}
