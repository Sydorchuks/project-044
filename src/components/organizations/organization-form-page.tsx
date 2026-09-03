"use client";

import { skipToken, useQuery } from "@tanstack/react-query";

import { OrganizationForm } from "@/components/organizations/organization-form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { getOrganization } from "@/features/organizations/api/organizations.api";

type OrganizationFormPageProps = Readonly<
  { mode: "create"; organizationId?: never } | { mode: "edit"; organizationId: number }
>;

export function OrganizationFormPage({ mode, organizationId }: OrganizationFormPageProps) {
  const isEditMode = mode === "edit";
  const isValidId =
    typeof organizationId === "number" &&
    Number.isSafeInteger(organizationId) &&
    organizationId > 0;
  const {
    data: organization,
    isFetchedAfterMount,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["organizations", "detail", organizationId, "edit"],
    queryFn: isEditMode && isValidId ? () => getOrganization(organizationId) : skipToken,
    staleTime: Infinity,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const title = isEditMode ? "Редагувати організацію" : "Додати організацію";
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Організації", href: "/organizations" },
    { label: title },
  ];

  return (
    <section className="min-h-full bg-main-bg px-5 pt-5 pb-8 lg:pr-4 lg:pl-0 xl:pr-7">
      <header className="min-h-16.5">
        <h1 className="font-sans text-[22px] leading-[26px] font-medium text-text-heading">
          {title}
        </h1>

        <Breadcrumbs items={breadcrumbs} className="mt-2 text-[16px] leading-5" />
      </header>

      <div className="mx-auto mt-7.5 flex max-w-[650px] justify-center desktop:translate-x-3.5">
        {!isEditMode ? <OrganizationForm mode="create" /> : null}

        {isEditMode && (!isValidId || isError) ? (
          <div className="grid min-h-80 w-full place-items-center rounded-2xl bg-background p-8 text-center shadow-organization-form">
            <div>
              <p className="text-[16px] leading-5 text-text-error">
                Не вдалося завантажити організацію
              </p>

              {isValidId ? (
                <Button type="button" variant="outline" onClick={() => refetch()} className="mt-4">
                  Спробувати ще раз
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}

        {isEditMode && isValidId && !isFetchedAfterMount && !isError ? (
          <Skeleton
            aria-label="Завантаження організації"
            role="status"
            className="h-96 w-full shadow-organization-form"
          />
        ) : null}

        {isEditMode && isValidId && isFetchedAfterMount && !isError && organization ? (
          <OrganizationForm key={organization.id} mode="edit" organization={organization} />
        ) : null}
      </div>
    </section>
  );
}
