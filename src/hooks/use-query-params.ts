"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type QueryParamValue = string | number | boolean | null | undefined;

type QueryParams = Record<string, QueryParamValue>;

type UpdateQueryParamsOptions = {
  replace?: boolean;
  scroll?: boolean;
};

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryParamsHref = useCallback(
    (updates: QueryParams) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([name, value]) => {
        if (value === null || value === undefined) {
          params.delete(name);
        } else {
          params.set(name, String(value));
        }
      });

      const query = params.toString();

      return query ? `${pathname}?${query}` : pathname;
    },
    [pathname, searchParams],
  );

  const updateQueryParams = useCallback(
    (updates: QueryParams, options: UpdateQueryParamsOptions = {}) => {
      const { replace = false, scroll = false } = options;
      const href = getQueryParamsHref(updates);

      if (replace) {
        router.replace(href, { scroll });
        return;
      }
      router.push(href, { scroll });
    },
    [getQueryParamsHref, router],
  );

  return { searchParams, getQueryParamsHref, updateQueryParams };
}
