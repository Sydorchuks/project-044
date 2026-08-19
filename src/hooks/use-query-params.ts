"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type QueryParamPrimitive = string | number | boolean;

type QueryParamValue =
  QueryParamPrimitive | readonly QueryParamPrimitive[] | null | undefined;

type QueryParams = Record<string, QueryParamValue>;
type SearchParamsConfig = Record<string, "single" | "array">;
type EmptySearchParamsConfig = Record<never, never>;

type SearchParamsObject<TConfig extends SearchParamsConfig> = {
  readonly [TKey in keyof TConfig]: TConfig[TKey] extends "array"
    ? string[]
    : string | undefined;
};

type UpdateQueryParamsOptions = {
  replace?: boolean;
  scroll?: boolean;
};

export function useQueryParams<
  const TConfig extends SearchParamsConfig = EmptySearchParamsConfig,
>(config?: TConfig) {
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();

  const searchParams = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(config ?? {}).map(([name, type]) => [
          name,
          type === "array"
            ? urlSearchParams.getAll(name)
            : (urlSearchParams.get(name) ?? undefined),
        ]),
      ) as SearchParamsObject<TConfig>,
    [config, urlSearchParams],
  );

  const getQueryParamsHref = useCallback(
    (updates: QueryParams) => {
      const params = new URLSearchParams(urlSearchParams.toString());

      Object.entries(updates).forEach(([name, value]) => {
        params.delete(name);

        if (Array.isArray(value)) {
          value.forEach((item) => {
            params.append(name, String(item));
          });
          return;
        }

        if (value !== null && value !== undefined) {
          params.set(name, String(value));
        }
      });

      const query = params.toString();
      return query ? `${pathname}?${query}` : pathname;
    },
    [pathname, urlSearchParams],
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
