import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function OrganizationsEmptyState() {
  return (
    <div className="grid min-h-[calc(100dvh-190px)] place-items-center px-5 pb-20">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="font-sans text-[22px] leading-7 font-medium text-primary">
          На жаль, ви ще не створили жодної організації
        </p>

        <Button
          nativeButton={false}
          render={<Link href="/organizations/create" />}
          className="h-10 rounded-xl px-4 font-sans text-[14px] leading-4 font-medium"
        >
          <Plus aria-hidden="true" className="size-4" />
          Додати організацію
        </Button>
      </div>
    </div>
  );
}
