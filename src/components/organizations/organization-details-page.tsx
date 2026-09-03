"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { getOrganization } from "@/features/organizations/api/organizations.api";

type OrganizationDetailsPageProps = Readonly<{
  organizationId: number;
  imageUploadFailed?: boolean;
}>;

export function OrganizationDetailsPage({
  organizationId,
  imageUploadFailed,
}: OrganizationDetailsPageProps) {
  const {
    data: organization,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["organizations", "detail", organizationId],
    queryFn: () => getOrganization(organizationId),
  });

  if (isError) {
    return (
      <section className="grid min-h-full place-items-center bg-main-bg px-5 text-center">
        <div>
          <p className="text-[18px] leading-6 text-text-error">
            Не вдалося завантажити організацію
          </p>

          <Button type="button" variant="outline" onClick={() => refetch()} className="mt-4">
            Спробувати ще раз
          </Button>
        </div>
      </section>
    );
  }

  if (isPending || !organization) {
    return (
      <section className="min-h-full bg-main-bg px-5 pt-5 lg:pr-4 lg:pl-0 xl:pr-7">
        <Skeleton className="h-10 w-72" />
      </section>
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Організації", href: "/organizations" },
    { label: organization.name },
  ];

  return (
    <section className="min-h-full bg-main-bg px-5 pt-5 pb-8 lg:pr-4 lg:pl-0 xl:pr-7">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="font-sans text-[22px] leading-[26px] font-medium text-text-heading">
            {organization.name}
          </h1>

          <Breadcrumbs items={breadcrumbs} className="mt-2 text-[16px] leading-5" />
        </div>

        <Button
          nativeButton={false}
          render={<Link href={`/organizations/${organization.id}/edit`} />}
          className="h-10 w-46 rounded-2xl px-3.5 text-[14px] leading-4 font-medium"
        >
          Редагувати
        </Button>
      </div>

      {imageUploadFailed ? (
        <p role="alert" className="mt-6 text-[14px] leading-5 text-warning">
          Організацію збережено, але не вдалося оновити зображення. Спробуйте змінити його ще раз.
        </p>
      ) : null}
    </section>
  );
}
