import { DashboardNotFound } from "@/components/dashboard/dashboard-not-found";
import { ObjectDetailsPage } from "@/components/rental-objects/object-details-page";
import { parseOrganizationId } from "@/features/organizations/lib/organization-route.utils";

type ObjectPageProps = { params: Promise<{ id: string; objectId: string }> };

export default async function ObjectPage({ params }: ObjectPageProps) {
  const { id, objectId } = await params;
  const organizationId = parseOrganizationId(id);
  const rentalObjectId = parseOrganizationId(objectId);

  if (organizationId === null || rentalObjectId === null) return <DashboardNotFound />;

  return <ObjectDetailsPage organizationId={organizationId} objectId={rentalObjectId} />;
}
