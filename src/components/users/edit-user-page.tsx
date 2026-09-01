"use client";

import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { DeletedUserDetails } from "@/components/users/deleted-user-details";
import { EditUserForm } from "@/components/users/edit-user-form";
import { getUser } from "@/features/users/api/users.api";
import { UserStatus } from "@/features/users/types/user.types";
import { cn } from "@/lib/utils";

type EditUserPageProps = {
  userId: number;
};

export function EditUserPage({ userId }: EditUserPageProps) {
  const isValidUserId = Number.isSafeInteger(userId) && userId > 0;

  const {
    data: user,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users", "detail", userId],
    queryFn: () => getUser(userId),
    enabled: isValidUserId,
    retry: false,
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Користувачі",
      href: "/users",
    },
    {
      label: `#${userId}`,
    },
  ];

  const isDeleted = user?.account.status === UserStatus.DELETED;

  return (
    <section className="h-full min-h-0 overflow-auto bg-main-bg px-5 pt-4 pb-8 xl:px-0 xl:pt-0 xl:pr-7 desktop:pr-10 ultra:pr-14">
      <div className="grid min-h-full w-full grid-cols-[250px_minmax(420px,460px)_1fr] grid-rows-[auto_1fr] gap-x-6 pt-12 xl:grid-cols-[300px_minmax(440px,500px)_1fr] xl:gap-x-8 xl:pt-10 desktop:grid-cols-[390px_minmax(620px,640px)_1fr] desktop:gap-x-12 desktop:pt-14 ultra:grid-cols-[560px_minmax(700px,720px)_1fr] ultra:gap-x-16 ultra:pt-20">
        <div className="col-start-1 row-start-1 xl:-translate-y-3 desktop:translate-y-0">
          <h1 className="max-w-60 font-sans text-[22px] leading-7 font-bold text-text-heading xl:max-w-none xl:text-[24px] xl:leading-8 desktop:text-[24px] desktop:leading-8 ultra:text-[32px] ultra:leading-10">
            {isDeleted ? `Користувач #${userId}` : "Редагувати користувача"}
          </h1>

          <Breadcrumbs items={breadcrumbs} className="mt-3 ultra:text-[16px] ultra:leading-5" />
        </div>

        <div
          className={cn("flex min-h-0 items-start", {
            "col-start-1 col-end-4 row-start-1 row-end-3 justify-center pt-22.5": isDeleted,
            "col-start-2 row-start-2 pt-10 xl:pt-8 desktop:col-start-2 desktop:row-start-1 desktop:row-end-3 desktop:items-center desktop:pt-0":
              !isDeleted,
          })}
        >
          {isPending && isValidUserId && <EditUserFormFallback />}

          {(!isValidUserId || error) && (
            <EditUserError
              message={getUserLoadError(error, isValidUserId)}
              onRetry={isValidUserId ? () => void refetch() : undefined}
            />
          )}

          {user && !isDeleted && <EditUserForm user={user} />}

          {user && isDeleted && <DeletedUserDetails user={user} />}
        </div>
      </div>
    </section>
  );
}

function EditUserFormFallback() {
  return (
    <div className="h-120 w-full max-w-115 animate-pulse rounded-3xl bg-background shadow-sm desktop:max-w-140 ultra:max-w-170" />
  );
}

function EditUserError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="w-full max-w-115 rounded-3xl bg-background p-8 text-center shadow-sm desktop:max-w-140 ultra:max-w-170">
      <p className="font-sans text-[14px] leading-5 text-text-error">{message}</p>

      {onRetry && (
        <Button
          type="button"
          onClick={onRetry}
          className="mt-5 h-10 min-w-36 rounded-3xl font-sans text-[14px] font-bold"
        >
          Спробувати ще раз
        </Button>
      )}
    </div>
  );
}

function getUserLoadError(error: unknown, isValidUserId: boolean) {
  if (!isValidUserId) {
    return "Некоректний ідентифікатор користувача";
  }

  if (isAxiosError(error)) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return "Недостатньо прав для перегляду користувача";
    }

    if (error.response?.status === 404 || error.response?.status === 409) {
      return "Користувача не знайдено";
    }
  }

  return "Не вдалося завантажити користувача";
}
