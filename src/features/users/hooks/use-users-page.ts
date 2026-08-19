"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import { getUsers } from "@/features/users/api/users.api";
import type { User } from "@/features/users/types/user.types";
import { useQueryParams } from "@/hooks/use-query-params";

const USERS_LIMIT = 8;
const USERS_SORT_FIELDS = ["id", "first_name", "created_at"] as const;
const USERS_SEARCH_PARAMS_CONFIG = {
  search: "single",
  page: "single",
  sort: "single",
} as const;
const EMPTY_USERS: User[] = [];

export type UsersSortField = (typeof USERS_SORT_FIELDS)[number];
export type UsersSort = `${UsersSortField}:${1 | -1}`;
const DEFAULT_USERS_SORT: UsersSort = "id:1";

export function useUsersPage() {
  const { searchParams, updateQueryParams } = useQueryParams(
    USERS_SEARCH_PARAMS_CONFIG,
  );

  const { search: searchValue, page: pageValue, sort: sortValue } = searchParams;

  const search = (searchValue ?? "").trim();
  const page = parsePage(pageValue);
  const sort = parseSort(sortValue);
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
        sort,
      },
    ],
    queryFn: () =>
      getUsers({
        limit: USERS_LIMIT,
        skip,
        search: search || undefined,
        sort,
      }),
  });

  const users = usersResponse?.data ?? EMPTY_USERS;
  const total = usersResponse?.filters.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / USERS_LIMIT));

  const rangeLabel = useMemo(() => {
    if (!total || users.length === 0) {
      return "Показано 0 з 0";
    }

    const from = skip + 1;
    const to = Math.min(skip + users.length, total);

    return `Показано ${from}-${to} із ${total}`;
  }, [skip, total, users.length]);

  const handleSearch = useCallback(
    (value: string) => {
      const normalizedSearch = value.trim();

      updateQueryParams({
        search: normalizedSearch || null,
        page: null,
      });
    },
    [updateQueryParams],
  );

  const handleClear = useCallback(() => {
    updateQueryParams({
      search: null,
      sort: null,
      page: null,
    });
  }, [updateQueryParams]);

  const handleSort = useCallback(
    (field: UsersSortField) => {
      const [currentField, currentDirection] = sort.split(":");

      const nextDirection = currentField === field && currentDirection === "1" ? -1 : 1;
      const nextSort = `${field}:${nextDirection}` as UsersSort;

      updateQueryParams({
        sort: nextSort === DEFAULT_USERS_SORT ? null : nextSort,
        page: null,
      });
    },
    [sort, updateQueryParams],
  );

  return {
    users,
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

function parsePage(value: string | undefined) {
  const parsedPage = Number(value ?? "1");

  return Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

function parseSort(value: string | undefined): UsersSort {
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
