"use client";

import { Plus } from "lucide-react";

import { OrganizationCard } from "@/components/organizations/organization-card";
import { OrganizationsEmptyState } from "@/components/organizations/organizations-empty-state";
import { Button } from "@/components/ui/button";
import { useOrganizations } from "@/features/organizations/hooks/use-organizations";

export function OrganizationsPage() {
  const { data: organizations = [], isPending, isError, refetch } = useOrganizations();

  return (
    <section className="min-h-full bg-main-bg px-5 pt-5 pb-8 lg:pr-4 lg:pl-0 xl:pr-7">
      <div className="flex min-h-10 items-start justify-between gap-6">
        <h1 className="font-sans text-[22px] leading-[26px] font-medium text-text-heading">
          Організації
        </h1>

        <Button
          type="button"
          className="h-10 w-46 gap-1 rounded-2xl px-3.5 font-sans text-[14px] leading-4 font-medium"
        >
          <Plus aria-hidden="true" className="size-5" />
          Додати організацію
        </Button>
      </div>

      {isPending ? <OrganizationsGridSkeleton /> : null}

      {isError ? (
        <div className="grid min-h-[calc(100dvh-190px)] place-items-center px-5 pb-20 text-center">
          <div>
            <p className="font-sans text-[16px] leading-5 text-text-error">
              Не вдалося завантажити організації
            </p>

            <Button type="button" variant="outline" onClick={() => refetch()} className="mt-4">
              Спробувати ще раз
            </Button>
          </div>
        </div>
      ) : null}

      {!isPending && !isError && organizations.length === 0 ? <OrganizationsEmptyState /> : null}

      {!isPending && !isError && organizations.length > 0 ? (
        <ul className="mt-7 grid max-w-[795px] grid-cols-1 gap-[25px] sm:grid-cols-2 desktop:max-w-[1615px] desktop:grid-cols-4">
          {organizations.map((organization) => (
            <li key={organization.id}>
              <OrganizationCard organization={organization} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function OrganizationsGridSkeleton() {
  return (
    <div
      aria-label="Завантаження організацій"
      role="status"
      className="mt-7 grid max-w-[795px] grid-cols-1 gap-[25px] sm:grid-cols-2 desktop:max-w-[1615px] desktop:grid-cols-4"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[77/38] rounded-[10px] bg-surface" />
          <div className="mx-[11px] mt-[18px]">
            <div className="h-6.25 w-2/5 rounded bg-surface" />
            <div className="mt-2 h-9 rounded bg-surface" />
            <div className="mt-2.5 h-8.75 w-28.75 rounded-3xl bg-surface" />
          </div>
        </div>
      ))}
    </div>
  );
}
