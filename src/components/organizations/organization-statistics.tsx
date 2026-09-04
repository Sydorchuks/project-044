"use client";

import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, ShoppingCart, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getOrganizationStatistics } from "@/features/organizations/api/organization-details.api";
import type { Organization } from "@/features/organizations/schemas/organization.schema";

type OrganizationStatisticsProps = Readonly<{ organization: Organization }>;

const numberFormatter = new Intl.NumberFormat("uk-UA");
const moneyFormatter = new Intl.NumberFormat("uk-UA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function OrganizationStatistics({ organization }: OrganizationStatisticsProps) {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["organizations", "statistics", organization.id, organization.created_at],
    queryFn: () => getOrganizationStatistics(organization.id, organization.created_at!),
    enabled: Boolean(organization.created_at),
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const metrics = [
    {
      label: "Всього продажів",
      icon: Wallet,
      value: data ? `UAH ${moneyFormatter.format(data.total_revenue)}` : "—",
    },
    {
      label: "Всього бронювань",
      icon: ShoppingCart,
      value: data ? numberFormatter.format(data.total_reservations) : "—",
    },
    { label: "Всього клієнтів", icon: BadgeCheck, value: "—" },
  ];

  return (
    <section aria-label="Статистика організації" aria-busy={isLoading}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {metrics.map(({ label, icon: Icon, value }) => (
          <Card key={label} className="min-w-0 gap-4 rounded-2xl p-5 shadow-organization-form">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h2 className="text-[16px] leading-5 font-medium text-text-muted">{label}</h2>
              {isLoading ? (
                <Skeleton className="mt-2 h-6.5 w-24 bg-muted" />
              ) : (
                <p className="mt-2 text-[22px] leading-6.5 font-medium wrap-break-word text-text-heading">
                  {value}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
      {isError ? (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 text-[12px] leading-4 text-text-muted">
          <p role="status">Статистика тимчасово недоступна.</p>
          <Button
            type="button"
            variant="link"
            disabled={isFetching}
            onClick={() => void refetch()}
            className="h-auto p-0 text-[12px]"
          >
            Повторити
          </Button>
        </div>
      ) : null}
    </section>
  );
}
