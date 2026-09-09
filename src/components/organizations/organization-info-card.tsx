import { DetailsInfoCard } from "@/components/details/details-info-card";
import type { Organization } from "@/features/organizations/schemas/organization.schema";
import { WEEKDAYS } from "@/features/organizations/config/organization-form.config";

type OrganizationInfoCardProps = { organization: Organization };

export function OrganizationInfoCard({ organization }: OrganizationInfoCardProps) {
  return (
    <DetailsInfoCard
      photo={organization.photo}
      photoAlt={`Фото організації ${organization.name}`}
      workingHours={WEEKDAYS.map(({ key, label }) => ({
        key,
        label,
        start: organization[`${key}_start_hours`],
        end: organization[`${key}_end_hours`],
      }))}
      fields={[
        { label: "ID організації", value: `ID-${organization.id}` },
        { label: "Назва організації", value: organization.name },
        { label: "Місцезнаходження", value: organization.address },
      ]}
    />
  );
}
