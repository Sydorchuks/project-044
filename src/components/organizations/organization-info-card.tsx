"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { WEEKDAYS } from "@/features/organizations/config/organization-form.config";
import { formatWorkingHours } from "@/features/organizations/lib/organization-details.utils";
import type { Organization } from "@/features/organizations/schemas/organization.schema";

type OrganizationInfoCardProps = {
  organization: Organization;
};

export function OrganizationInfoCard({ organization }: OrganizationInfoCardProps) {
  const [failedPhoto, setFailedPhoto] = useState<string | null>(null);
  const photo = organization.photo;
  const fields = [
    { label: "ID організації", value: `ID-${organization.id}` },
    { label: "Назва організації", value: organization.name },
    { label: "Місцезнаходження", value: organization.address },
  ];

  return (
    <Card className="w-full max-w-195.5 items-start gap-6 rounded-2xl p-5 shadow-organization-form md:flex-row desktop:flex-col desktop:gap-4.5 desktop:rounded-3xl desktop:p-4">
      <div className="relative grid h-47.5 w-full place-items-center overflow-hidden rounded-2xl bg-[linear-gradient(106.65deg,var(--primary),var(--organization-placeholder-end))] md:flex-1 desktop:h-57.5 desktop:flex-none">
        {photo && failedPhoto !== photo ? (
          <Image
            src={photo}
            alt={`Фото організації ${organization.name}`}
            fill
            unoptimized
            sizes="(min-width: 1920px) 328px, (min-width: 768px) 385px, 100vw"
            className="object-cover"
            onError={() => setFailedPhoto(photo)}
          />
        ) : (
          <ImageIcon aria-label="Фото відсутнє" className="size-12 text-primary-foreground/75" />
        )}
      </div>

      <div className="min-w-0 text-sm leading-5 md:w-36 desktop:order-2 desktop:w-full">
        <h2 className="font-medium text-text-heading">Години роботи</h2>
        <ul className="mt-1 space-y-1 text-text-muted">
          {WEEKDAYS.map(({ key, label }) => (
            <li key={key} className="flex flex-wrap gap-x-1">
              <span>{label}</span>
              <span>
                {formatWorkingHours(
                  organization[`${key}_start_hours`],
                  organization[`${key}_end_hours`],
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="min-w-0 space-y-4 text-sm leading-4 font-medium md:w-36 desktop:w-full">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-text-muted">{label}</dt>
            <dd className="mt-1 wrap-break-word text-text-heading">{value || "Не вказано"}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
