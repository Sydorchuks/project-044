import { useEffect, useMemo, useState } from "react";

import { getUsers } from "@/features/users/api/users.api";
import type { User, UsersResponse } from "@/features/users/types/user.types";

const USERS_LIMIT = 8;

export function useUsersPage() {
  const [usersResponse, setUsersResponse] = useState<UsersResponse | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const skip = (page - 1) * USERS_LIMIT;
  const total = usersResponse?.filters.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / USERS_LIMIT));

  const rangeLabel = useMemo(() => {
    if (!total) return "Показано 0 з 0";

    const from = skip + 1;
    const to = skip + users.length;

    return `Показано ${from}-${to} із ${total}`;
  }, [skip, total, users.length]);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getUsers({
          limit: USERS_LIMIT,
          skip,
          search: appliedSearch || undefined,
          sort: "id:1",
        });

        if (!isMounted) return;

        setUsersResponse(data);
        setUsers(data.data);
      } catch {
        if (!isMounted) return;

        setUsersResponse(null);
        setUsers([]);
        setError("Не вдалося завантажити користувачів");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadUsers();

    return () => {
      isMounted = false;
    };
  }, [appliedSearch, skip]);

  function handleSearch() {
    setPage(1);
    setAppliedSearch(search.trim());
  }

  function handleClear() {
    setSearch("");
    setAppliedSearch("");
    setPage(1);
  }

  return {
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
  };
}
