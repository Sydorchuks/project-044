import { rentalObjectSchema } from "@/features/rental-objects/schemas/rental-object.schema";
import { apiClient } from "@/lib/api/client";

export async function getRentalObject(id: number) {
  const { data } = await apiClient.get<unknown>(`api/rental_object/${id}`);

  return rentalObjectSchema.parse(data);
}
