import { OrganizationDetailsPage } from "@/components/organizations/organization-details-page";
import { DashboardNotFound } from "@/components/dashboard/dashboard-not-found";
import { parseOrganizationId } from "@/features/organizations/lib/organization-route.utils";

type OrganizationPageProps = Readonly<{
  params: Promise<{ id: string }>;
  searchParams: Promise<{ imageUpload?: string }>;
}>;

export default async function OrganizationPage({ params, searchParams }: OrganizationPageProps) {
  const [{ id }, { imageUpload }] = await Promise.all([params, searchParams]);
  const organizationId = parseOrganizationId(id);

  if (organizationId === null) {
    return <DashboardNotFound />;
  }

  return (
    <OrganizationDetailsPage
      organizationId={organizationId}
      imageUploadFailed={imageUpload === "failed"}
    />
  );
}
