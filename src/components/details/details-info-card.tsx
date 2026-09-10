"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { formatWorkingHours } from "@/features/organizations/lib/organization-details.utils";
import { cn } from "@/lib/utils";

type WorkingHoursRow = { key: string; label: string; start?: number | null; end?: number | null };

type DetailsInfoCardProps = {
  photo?: string | null;
  photoAlt: string;
  workingHours: WorkingHoursRow[];
  fields: { label: string; value: string | null | undefined }[];
  className?: string;
};

export function DetailsInfoCard({
  photo,
  photoAlt,
  workingHours,
  fields,
  className,
}: DetailsInfoCardProps) {
  const [failedPhoto, setFailedPhoto] = useState<string | null>(null);

  return (
    <Card
      className={cn(
        "w-full max-w-195.5 items-start gap-6 rounded-2xl p-5 shadow-organization-form md:flex-row desktop:flex-col desktop:gap-4.5 desktop:rounded-3xl desktop:p-4",
        className,
      )}
    >
      <div className="relative grid h-47.5 w-full place-items-center overflow-hidden rounded-2xl bg-[linear-gradient(106.65deg,var(--primary),var(--organization-placeholder-end))] md:flex-1 desktop:h-57.5 desktop:flex-none">
        {photo && failedPhoto !== photo ? (
          <Image
            src={photo}
            alt={photoAlt}
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
          {workingHours.map(({ key, label, start, end }) => (
            <li key={key} className="flex flex-wrap gap-x-1">
              <span>{label}</span>
              <span>{formatWorkingHours(start, end)}</span>
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
