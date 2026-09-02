import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Organization } from "@/features/organizations/schemas/organization.schema";

type OrganizationCardProps = Readonly<{
  organization: Organization;
}>;

export function OrganizationCard({ organization }: OrganizationCardProps) {
  const imageStyle = organization.photo
    ? { backgroundImage: `url(${JSON.stringify(organization.photo)})` }
    : undefined;

  return (
    <article className="min-w-0">
      <div
        role={organization.photo ? "img" : undefined}
        aria-label={organization.photo ? `Фото організації ${organization.name}` : undefined}
        style={imageStyle}
        className="grid aspect-[77/38] w-full place-items-center rounded-[10px] bg-[linear-gradient(106.65deg,var(--primary)_-9.76%,var(--organization-placeholder-end)_98.5%)] bg-cover bg-center"
      >
        {!organization.photo ? (
          <span className="grid size-16 place-items-center text-primary-foreground/75">
            <ImageIcon aria-hidden="true" className="size-12" />
          </span>
        ) : null}
      </div>

      <div className="mx-[11px] mt-[18px] flex flex-col gap-2.5">
        <div className="h-[69px]">
          <h2 className="h-6.25 truncate font-sans text-[18px] leading-[21px] font-medium text-organization-card-title">
            {organization.name}
          </h2>

          <p className="mt-2 line-clamp-2 h-9 font-sans text-[12px] leading-[14px] text-organization-card-description">
            {organization.description || "Опис організації відсутній"}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-8.75 w-28.75 rounded-3xl border-primary bg-transparent px-2 font-sans text-[14px] leading-4 font-medium text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Відкрити
        </Button>
      </div>
    </article>
  );
}
