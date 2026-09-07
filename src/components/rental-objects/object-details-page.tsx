"use client";

import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { BadgeCheck, ShoppingCart, Wallet } from "lucide-react";

import { DashboardNotFound } from "@/components/dashboard/dashboard-not-found";
import { DetailsInfoCard } from "@/components/details/details-info-card";
import { StatisticsCards } from "@/components/details/statistics-cards";
import { ObjectBookingHistory } from "@/components/rental-objects/object-booking-history";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getRentalObject } from "@/features/rental-objects/api/rental-objects.api";

type ObjectDetailsPageProps = { organizationId: number; objectId: number };

const moneyFormatter = new Intl.NumberFormat("uk-UA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const numberFormatter = new Intl.NumberFormat("uk-UA");

export function ObjectDetailsPage({ organizationId, objectId }: ObjectDetailsPageProps) {
  const {
    data: object,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["rental-objects", "detail", objectId],
    queryFn: () => getRentalObject(objectId),
    retry: false,
  });

  if (isAxiosError(error) && [404, 409].includes(error.response?.status ?? 0)) {
    return <DashboardNotFound />;
  }

  if (isError) {
    return (
      <section className="grid min-h-full place-items-center bg-main-bg px-5 text-center">
        <div>
          <p role="alert" className="text-lg leading-6 text-text-error">
            {isAxiosError(error) && error.response?.status === 403
              ? "Недостатньо прав для перегляду об’єкта"
              : "Не вдалося завантажити об’єкт"}
          </p>
          <Button
            type="button"
            variant="outline"
            disabled={isFetching}
            onClick={() => void refetch()}
            className="mt-4"
          >
            Спробувати ще раз
          </Button>
        </div>
      </section>
    );
  }

  if (isPending) {
    return (
      <section
        aria-label="Завантаження об’єкта"
        aria-busy="true"
        className="min-h-full bg-main-bg px-5 pt-5 lg:pr-4 lg:pl-0 xl:pr-7"
      >
        <Skeleton className="h-10 w-72" />
      </section>
    );
  }

  if (
    object.is_deleted ||
    object.organization.is_deleted ||
    object.organization.id !== organizationId
  ) {
    return <DashboardNotFound />;
  }

  const metrics = [
    {
      label: "Всього резервацій",
      icon: Wallet,
      value: `UAH ${moneyFormatter.format(object.total_reservation_sum)}`,
    },
    {
      label: "Всього бронювань",
      icon: ShoppingCart,
      value: numberFormatter.format(object.total_reservation_amount),
    },
    {
      label: "Всього клієнтів",
      icon: BadgeCheck,
      value: numberFormatter.format(object.total_clients_amount),
    },
  ];

  return (
    <section className="min-h-full bg-main-bg px-5 pt-6 pb-10 lg:pr-4 lg:pl-0 xl:pr-7">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-full min-w-0">
          <h1 className="text-title leading-6.5 font-medium wrap-anywhere text-text-heading">
            {object.name}
          </h1>
          <Breadcrumbs
            className="mt-2 text-base leading-5 [&_li]:min-w-0 [&_li]:wrap-anywhere [&_ul]:flex-wrap"
            items={[
              { label: "Організації", href: "/organizations" },
              { label: object.organization.name, href: `/organizations/${organizationId}` },
              { label: object.name },
            ]}
          />
        </div>
        <Button
          type="button"
          disabled
          className="h-9 w-38.5 shrink-0 rounded-2xl px-3.5 text-sm leading-4 font-medium"
        >
          Редагувати
        </Button>
      </div>
      <div
        key={object.id}
        className="mt-9 grid items-start gap-6 desktop:mt-5 desktop:grid-cols-[360px_minmax(0,1fr)]"
      >
        <DetailsInfoCard
          photo={object.photo}
          photoAlt={`Фото об’єкта ${object.name}`}
          workingHours={object}
          className="max-w-187.25"
          fields={[
            { label: "ID об’єкта", value: `ID-${object.id}` },
            { label: "Назва об’єкта", value: object.name },
            { label: "Тип спорту", value: null },
          ]}
        />
        <div className="grid min-w-0 gap-6">
          <section aria-label="Статистика об’єкта">
            <StatisticsCards metrics={metrics} />
          </section>
          <ObjectBookingHistory reservationCount={object.total_reservation_amount} />
        </div>
      </div>
    </section>
  );
}
