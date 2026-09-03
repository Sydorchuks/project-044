import { OrganizationDetailsPage } from "@/components/organizations/organization-details-page";

type OrganizationPageProps = Readonly<{
  params: Promise<{ id: string }>;
  searchParams: Promise<{ imageUpload?: string }>;
}>;

export default async function OrganizationPage({ params, searchParams }: OrganizationPageProps) {
  const [{ id }, { imageUpload }] = await Promise.all([params, searchParams]);

  return (
    <OrganizationDetailsPage
      organizationId={Number(id)}
      imageUploadFailed={imageUpload === "failed"}
    />
  );
}
