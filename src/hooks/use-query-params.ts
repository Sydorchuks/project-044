"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { z } from "zod";

type QueryParamPrimitive = string | number | boolean;

type QueryParamValue =
  QueryParamPrimitive | readonly QueryParamPrimitive[] | null | undefined;

type QueryParams = Record<string, QueryParamValue>;

type ParsedSearchParams<TSchema extends z.ZodType | undefined> =
  TSchema extends z.ZodType ? z.output<TSchema> : Record<string, string | string[]>;
type QueryParamsUpdate<TSchema extends z.ZodType | undefined> =
  TSchema extends z.ZodType
    ? Partial<{
        [TKey in keyof z.output<TSchema>]: z.output<TSchema>[TKey] | null;
      }>
    : QueryParams;

type UpdateQueryParamsOptions = {
  replace?: boolean;
  scroll?: boolean;
};

export function useQueryParams<TSchema extends z.ZodType | undefined = undefined>(
  schema?: TSchema,
) {
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();

  const searchParams = useMemo(() => {
    const params: Record<string, string | string[]> = {};

    urlSearchParams.forEach((value, name) => {
      const currentValue = params[name];

      if (currentValue === undefined) {
        params[name] = value;
        return;
      }

      if (Array.isArray(currentValue)) {
        params[name] = [...currentValue, value];
        return;
      }

      params[name] = [currentValue, value];
    });

    return (schema ? schema.parse(params) : params) as ParsedSearchParams<TSchema>;
  }, [schema, urlSearchParams]);

  const getQueryParamsHref = useCallback(
    (updates: QueryParamsUpdate<TSchema>) => {
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
    (updates: QueryParamsUpdate<TSchema>, options: UpdateQueryParamsOptions = {}) => {
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

  return {
    searchParams,
    getQueryParamsHref,
    updateQueryParams,
  };
}
