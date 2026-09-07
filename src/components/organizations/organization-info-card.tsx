import { DetailsInfoCard } from "@/components/details/details-info-card";
import type { Organization } from "@/features/organizations/schemas/organization.schema";

type OrganizationInfoCardProps = { organization: Organization };

export function OrganizationInfoCard({ organization }: OrganizationInfoCardProps) {
  return (
    <DetailsInfoCard
      photo={organization.photo}
      photoAlt={`Фото організації ${organization.name}`}
      workingHours={organization}
      fields={[
        { label: "ID організації", value: `ID-${organization.id}` },
        { label: "Назва організації", value: organization.name },
        { label: "Місцезнаходження", value: organization.address },
      ]}
    />
  );
}
