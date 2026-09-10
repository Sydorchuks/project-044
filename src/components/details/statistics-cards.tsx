import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type StatisticsCardsProps = {
  metrics: { label: string; icon: LucideIcon; value: string }[];
  isLoading?: boolean;
};

export function StatisticsCards({ metrics, isLoading = false }: StatisticsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {metrics.map(({ label, icon: Icon, value }) => (
        <Card key={label} className="min-w-0 gap-4 rounded-2xl p-5 shadow-organization-form">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Icon aria-hidden="true" className="size-6" />
          </span>
          <div>
            <h4 className="text-base leading-5 font-medium text-text-muted">{label}</h4>
            {isLoading ? (
              <Skeleton className="mt-2 h-6.5 w-24 bg-muted" />
            ) : (
              <p className="mt-2 text-title leading-6.5 font-medium wrap-break-word text-text-heading">
                {value}
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
