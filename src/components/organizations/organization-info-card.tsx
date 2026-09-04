"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { WEEKDAYS } from "@/features/organizations/config/organization-form.config";
import { formatWorkingHours } from "@/features/organizations/lib/organization-details.utils";
import type { Organization } from "@/features/organizations/schemas/organization.schema";

type OrganizationInfoCardProps = Readonly<{
  organization: Organization;
}>;

export function OrganizationInfoCard({ organization }: OrganizationInfoCardProps) {
  const [failedPhoto, setFailedPhoto] = useState<string | null>(null);
  const photo = organization.photo;
  const fields = [
    { label: "ID організації", value: `ID-${organization.id}` },
    { label: "Назва організації", value: organization.name },
    { label: "Місцезнаходження", value: organization.address },
  ];

  return (
    <Card className="grid w-full max-w-195.5 grid-cols-1 items-start gap-6 rounded-2xl p-5 shadow-organization-form md:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)_minmax(0,1fr)] desktop:flex desktop:max-w-none desktop:flex-col desktop:gap-4.5 desktop:rounded-3xl desktop:p-4">
      <div className="relative grid aspect-[385/190] w-full place-items-center overflow-hidden rounded-2xl bg-[linear-gradient(106.65deg,var(--primary),var(--organization-placeholder-end))] desktop:aspect-[328/230]">
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

      <div className="min-w-0 text-[14px] leading-5 desktop:order-2">
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

      <dl className="min-w-0 space-y-4 text-[14px] leading-4 font-medium desktop:w-full">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-text-muted">{label}</dt>
            <dd className="mt-1 break-words text-text-heading">{value || "Не вказано"}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
