import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { User } from "@/features/users/types/user.types";

type DeletedUserDetailsProps = {
  user: User;
};

export function DeletedUserDetails({ user }: DeletedUserDetailsProps) {
  return (
    <div className="w-full max-w-162.5">
      <Button
        nativeButton={false}
        variant="link"
        render={<Link href="/users" />}
        className="text-primary mb-3.75 h-5 justify-start gap-1.25 p-0 font-sans text-[16px] leading-4.75 font-medium"
      >
        <ChevronLeft aria-hidden="true" className="size-5" />
        Повернутись
      </Button>

      <Card className="border-border bg-background min-h-115.75 rounded-2xl shadow-[0_1.5px_2px_rgba(16,24,40,0.1)]">
        <CardContent className="p-6">
          <div className="mb-3.5 flex items-start justify-between gap-3.5">
            <h2 className="text-primary font-sans text-[18px] leading-5.25 font-medium">
              Загальна інформація
            </h2>

            <p className="text-text-heading font-sans text-[16px] leading-4.75 font-medium">
              Користувач видалений
            </p>
          </div>

          <dl className="space-y-3.5">
            <DeletedUserField label="Імʼя" value={user.first_name} />

            <DeletedUserField label="Прізвище" value={user.last_name} />

            <DeletedUserField label="Електронна пошта" value={user.account.email} />

            <DeletedUserField label="Номер телефону" value={user.phone} />

            <DeletedUserField
              label="Назва компанії (URL-адреса домену .reservenow.com)"
              value={user.domain_url}
            />

            <DeletedUserField label="Опис" value={user.description} />
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

function DeletedUserField({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-2.5">
      <dt className="text-text-heading font-sans text-[14px] leading-4 font-medium">
        {label}:
      </dt>

      <dd className="text-text-heading font-sans text-[14px] leading-4">
        {value || "-"}
      </dd>
    </div>
  );
}
