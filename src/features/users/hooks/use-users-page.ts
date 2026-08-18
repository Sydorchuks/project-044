"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { getUsers } from "@/features/users/api/users.api";
import { getUserFullName } from "@/features/users/lib/user-formatters";
import type { User } from "@/features/users/types/user.types";

const USERS_LIMIT = 8;
const USERS_SORT_FIELDS = ["id", "first_name", "email", "created_at"] as const;
const EMPTY_USERS: User[] = [];

const usersCollator = new Intl.Collator("uk-UA", {
  numeric: true,
  sensitivity: "base",
});

export type UsersSortField = (typeof USERS_SORT_FIELDS)[number];
export type UsersSort = `${UsersSortField}:${1 | -1}`;

const DEFAULT_USERS_SORT: UsersSort = "id:1";

export function useUsersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = (searchParams.get("search") ?? "").trim();
  const page = parsePage(searchParams.get("page"));
  const sort = parseSort(searchParams.get("sort"));
  const skip = (page - 1) * USERS_LIMIT;

  const {
    data: usersResponse,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "users",
      {
        limit: USERS_LIMIT,
        skip,
        search,
      },
    ],
    queryFn: () =>
      getUsers({
        limit: USERS_LIMIT,
        skip,
        search: search || undefined,
        sort: "id:1",
      }),
  });

  const users = usersResponse?.data ?? EMPTY_USERS;

  const sortedUsers = useMemo(() => {
    const [field, directionValue] = sort.split(":");
    const direction = directionValue === "-1" ? -1 : 1;

    return [...users].sort((firstUser, secondUser) => {
      switch (field) {
        case "id":
          return (firstUser.id - secondUser.id) * direction;
        case "first_name":
          return (
            compareText(getUserFullName(firstUser), getUserFullName(secondUser)) *
            direction
          );
        case "email":
          return (
            compareText(
              firstUser.account?.email ?? "",
              secondUser.account?.email ?? "",
            ) * direction
          );
        case "created_at":
          return compareDates(firstUser.created_at, secondUser.created_at) * direction;
        default:
          return 0;
      }
    });
  }, [sort, users]);

  const total = usersResponse?.filters.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / USERS_LIMIT));
  const rangeLabel = useMemo(() => {
    if (!total || sortedUsers.length === 0) {
      return "Показано 0 з 0";
    }

    const from = skip + 1;
    const to = Math.min(skip + sortedUsers.length, total);

    return `Показано ${from}-${to} із ${total}`;
  }, [skip, total, sortedUsers.length]);

  const updateSearchParams = useCallback(
    (update: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());

      update(params);
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const handleSearch = useCallback(
    (value: string) => {
      const normalizedSearch = value.trim();

      updateSearchParams((params) => {
        if (normalizedSearch) {
          params.set("search", normalizedSearch);
        } else {
          params.delete("search");
        }
        params.delete("page");
      });
    },
    [updateSearchParams],
  );

  const handleClear = useCallback(() => {
    updateSearchParams((params) => {
      params.delete("search");
      params.delete("sort");
      params.delete("page");
    });
  }, [updateSearchParams]);

  const handleSort = useCallback(
    (field: UsersSortField) => {
      const [currentField, currentDirection] = sort.split(":");

      const nextDirection = currentField === field && currentDirection === "1" ? -1 : 1;
      const nextSort = `${field}:${nextDirection}` as UsersSort;

      updateSearchParams((params) => {
        if (nextSort === DEFAULT_USERS_SORT) {
          params.delete("sort");
        } else {
          params.set("sort", nextSort);
        }
        params.delete("page");
      });
    },
    [sort, updateSearchParams],
  );

  return {
    users: sortedUsers,
    search,
    sort,
    page,
    totalPages,
    rangeLabel,
    isLoading,
    error: isError ? "Не вдалося завантажити користувачів" : "",
    handleSearch,
    handleClear,
    handleSort,
  };
}

function parsePage(value: string | null) {
  const parsedPage = Number(value ?? "1");

  return Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

function parseSort(value: string | null): UsersSort {
  if (!value) {
    return DEFAULT_USERS_SORT;
  }

  const [field, direction, extraPart] = value.split(":");
  const isValidField = (USERS_SORT_FIELDS as readonly string[]).includes(field);
  const isValidDirection = direction === "1" || direction === "-1";

  if (extraPart !== undefined || !isValidField || !isValidDirection) {
    return DEFAULT_USERS_SORT;
  }
  return `${field}:${direction}` as UsersSort;
}

function compareText(firstValue: string, secondValue: string) {
  return usersCollator.compare(firstValue.trim(), secondValue.trim());
}

function compareDates(firstValue: string, secondValue: string) {
  return new Date(firstValue).getTime() - new Date(secondValue).getTime();
}
