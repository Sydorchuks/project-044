"use client";

import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, ShoppingCart, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatisticsCards } from "@/components/details/statistics-cards";
import { getOrganizationStatistics } from "@/features/organizations/api/organization-details.api";
import type { Organization } from "@/features/organizations/schemas/organization.schema";
import { formatMoney, formatNumber } from "@/lib/formatters";

type OrganizationStatisticsProps = { organization: Organization };

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
      value: data ? formatMoney(data.total_revenue) : "—",
    },
    {
      label: "Всього бронювань",
      icon: ShoppingCart,
      value: data ? formatNumber(data.total_reservations) : "—",
    },
    { label: "Всього клієнтів", icon: BadgeCheck, value: "—" },
  ];

  return (
    <section aria-label="Статистика організації" aria-busy={isLoading}>
      <StatisticsCards metrics={metrics} isLoading={isLoading} />
      {isError ? (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 text-xs leading-4 text-text-muted">
          <p role="status">Статистика тимчасово недоступна.</p>
          <Button
            type="button"
            variant="link"
            disabled={isFetching}
            onClick={() => void refetch()}
            className="h-auto p-0 text-xs"
          >
            Повторити
          </Button>
        </div>
      ) : null}
    </section>
  );
}
