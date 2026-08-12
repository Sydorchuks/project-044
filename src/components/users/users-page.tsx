"use client";

import { Download, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsersPage } from "@/features/users/hooks/use-users-page";
import { UsersTable } from "./users-table";

export function UsersPage() {
  const {
    users,
    search,
    setSearch,
    page,
    totalPages,
    rangeLabel,
    isLoading,
    error,
    handleSearch,
    handleClear,
    setPage,
  } = useUsersPage();

  return (
    <section className="bg-main-bg desktop:pr-10 ultra:pr-14 min-h-full px-5 pt-4 pb-8 xl:px-0 xl:pt-0 xl:pr-7">
      <div className="w-full">
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5">
          <div>
            <h1 className="text-text-heading desktop:text-[28px] desktop:leading-9 mb-4 font-sans text-[24px] leading-8 font-bold">
              Користувачі
            </h1>

            <div className="flex items-center gap-4">
              <div className="desktop:max-w-117.5 ultra:max-w-140 relative w-full max-w-97">
                <Search className="text-text-muted pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Пошук..."
                  className="desktop:h-11 h-10 rounded-3xl pl-11"
                />
              </div>

              <Button
                type="button"
                onClick={handleSearch}
                className="desktop:h-11 desktop:w-36 h-10 w-31 rounded-3xl font-sans text-[14px] font-bold"
              >
                Пошук
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={handleClear}
                className="bg-action-muted text-primary-foreground hover:bg-action-muted/80 desktop:h-11 desktop:w-32 h-10 w-28 rounded-3xl font-sans text-[14px] font-bold"
              >
                Очистити
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              className="bg-action-muted text-primary-foreground hover:bg-action-muted/80 desktop:h-11 desktop:px-5 h-10 rounded-3xl px-4 font-sans text-[14px] font-bold"
            >
              <Download className="size-4" />
              Експорт
            </Button>

            <Button
              type="button"
              className="desktop:h-11 desktop:px-5 h-10 rounded-3xl px-4 font-sans text-[14px] font-bold"
            >
              <Plus className="size-4" />
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
          onPageChange={setPage}
        />
      </div>
    </section>
  );
}
