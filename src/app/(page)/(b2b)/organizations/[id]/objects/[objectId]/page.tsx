import { DashboardNotFound } from "@/components/dashboard/dashboard-not-found";
import { ObjectDetailsPage } from "@/components/rental-objects/object-details-page";
import { parsePositiveIntegerParam } from "@/lib/route-params";

type ObjectPageProps = { params: Promise<{ id: string; objectId: string }> };

export default async function ObjectPage({ params }: ObjectPageProps) {
  const { id, objectId } = await params;
  const organizationId = parsePositiveIntegerParam(id);
  const rentalObjectId = parsePositiveIntegerParam(objectId);

  if (organizationId === null || rentalObjectId === null) return <DashboardNotFound />;

  return <ObjectDetailsPage organizationId={organizationId} objectId={rentalObjectId} />;
}
