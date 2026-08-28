"use client";

import { Download, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UsersTable } from "@/components/users/users-table";
import { useUsersPage } from "@/features/users/hooks/use-users-page";
import { cn } from "@/lib/utils";

const CONTROL_BUTTON_CLASS_NAME = "desktop:h-11 h-10 rounded-3xl font-sans text-[14px] font-bold";
const SECONDARY_BUTTON_CLASS_NAME =
  "bg-action-muted text-primary-foreground hover:bg-action-muted/80";

export function UsersPage() {
  const router = useRouter();

  const {
    users,
    search,
    sort,
    page,
    totalPages,
    rangeLabel,
    isLoading,
    error,
    handleSearch,
    handleClear,
    handleSort,
  } = useUsersPage();

  function handleCreateUser() {
    router.push("/admin/users/create");
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchValue = String(formData.get("search") ?? "");

    handleSearch(searchValue);
  }

  return (
    <section className="min-h-full bg-main-bg px-5 pt-4 pb-8 xl:px-0 xl:pt-0 xl:pr-7 desktop:pr-10 ultra:pr-14">
      <div className="w-full">
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5">
          <div>
            <h1 className="mb-4 font-sans text-[24px] leading-8 font-bold text-text-heading desktop:text-[28px] desktop:leading-9">
              Користувачі
            </h1>

            <form className="flex items-center gap-4" onSubmit={handleSearchSubmit}>
              <div className="relative w-full max-w-97 desktop:max-w-117.5 ultra:max-w-140">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-text-muted"
                />

                <Input
                  key={search}
                  name="search"
                  defaultValue={search}
                  placeholder="Пошук..."
                  className="h-10 rounded-3xl pl-11 desktop:h-11"
                />
              </div>

              <Button type="submit" className={cn(CONTROL_BUTTON_CLASS_NAME, "w-31 desktop:w-36")}>
                Пошук
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={handleClear}
                className={cn(
                  CONTROL_BUTTON_CLASS_NAME,
                  SECONDARY_BUTTON_CLASS_NAME,
                  "w-28 desktop:w-32",
                )}
              >
                Очистити
              </Button>
            </form>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              className={cn(
                CONTROL_BUTTON_CLASS_NAME,
                SECONDARY_BUTTON_CLASS_NAME,
                "px-4 desktop:px-5",
              )}
            >
              <Download aria-hidden="true" className="size-4" />
              Експорт
            </Button>

            <Button
              type="button"
              onClick={handleCreateUser}
              className={cn(CONTROL_BUTTON_CLASS_NAME, "px-4 desktop:px-5")}
            >
              <Plus aria-hidden="true" className="size-4" />
              Додати користувача
            </Button>
          </div>
        </div>

        <UsersTable
          users={users}
          isLoading={isLoading}
          error={error}
          rangeLabel={rangeLabel}
          page={page}
          totalPages={totalPages}
          sort={sort}
          onSortChange={handleSort}
        />
      </div>
    </section>
  );
}
