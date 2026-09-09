import { OrganizationDetailsPage } from "@/components/organizations/organization-details-page";
import { DashboardNotFound } from "@/components/dashboard/dashboard-not-found";
import { parsePositiveIntegerParam } from "@/lib/route-params";

type OrganizationPageProps = Readonly<{
  params: Promise<{ id: string }>;
  searchParams: Promise<{ imageUpload?: string }>;
}>;

export default async function OrganizationPage({ params, searchParams }: OrganizationPageProps) {
  const [{ id }, { imageUpload }] = await Promise.all([params, searchParams]);
  const organizationId = parsePositiveIntegerParam(id);

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
