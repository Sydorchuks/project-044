import { OrganizationFormPage } from "@/components/organizations/organization-form-page";
import { DashboardNotFound } from "@/components/dashboard/dashboard-not-found";
import { parsePositiveIntegerParam } from "@/lib/route-params";

type EditOrganizationPageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export default async function EditOrganizationPage({ params }: EditOrganizationPageProps) {
  const { id } = await params;
  const organizationId = parsePositiveIntegerParam(id);

  if (organizationId === null) {
    return <DashboardNotFound />;
  }

  return <OrganizationFormPage mode="edit" organizationId={organizationId} />;
}
