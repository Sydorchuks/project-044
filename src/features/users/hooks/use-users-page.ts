"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { getUsers } from "@/features/users/api/users.api";
import type { User } from "@/features/users/types/user.types";
import { useQueryParams } from "@/hooks/use-query-params";
import {
  DEFAULT_USERS_SORT,
  UsersSort,
  UsersSortField,
  usersSearchParamsSchema,
} from "../schemas/use-search-params.schema";
const USERS_LIMIT = 8;
const EMPTY_USERS: User[] = [];

export function useUsersPage() {
  const { searchParams, updateQueryParams } = useQueryParams(usersSearchParamsSchema);
  const { search, page, sort } = searchParams;
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
      updateQueryParams({
        search: value.trim(),
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
