import { OrganizationFormPage } from "@/components/organizations/organization-form-page";

type EditOrganizationPageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export default async function EditOrganizationPage({ params }: EditOrganizationPageProps) {
  const { id } = await params;

  return <OrganizationFormPage mode="edit" organizationId={Number(id)} />;
}
