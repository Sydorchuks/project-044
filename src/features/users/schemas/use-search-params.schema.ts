import { z } from "zod";

export const USERS_SORT_FIELDS = ["id", "first_name", "created_at"] as const;

export type UsersSortField = (typeof USERS_SORT_FIELDS)[number];
export type UsersSort = `${UsersSortField}:${1 | -1}`;

export const DEFAULT_USERS_SORT: UsersSort = "id:1";

const usersSortSchema = z.custom<UsersSort>(isUsersSort).catch(DEFAULT_USERS_SORT);

export const usersSearchParamsSchema = z.object({
  search: z.string().trim().catch(""),
  page: z.coerce.number().int().positive().catch(1),
  sort: usersSortSchema,
});

function isUsersSort(value: unknown): value is UsersSort {
  if (typeof value !== "string") {
    return false;
  }

  const [field, direction, extraPart] = value.split(":");

  return (
    extraPart === undefined &&
    USERS_SORT_FIELDS.includes(field as UsersSortField) &&
    (direction === "1" || direction === "-1")
  );
}
