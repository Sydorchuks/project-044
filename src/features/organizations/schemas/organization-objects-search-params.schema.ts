import { z } from "zod";

export const organizationObjectsSearchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  sortBy: z.enum(["created_at"]).catch("created_at"),
  sortDirection: z.enum(["ASC", "DESC"]).catch("DESC"),
});
