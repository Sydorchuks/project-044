import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ObjectBookingHistoryProps = { reservationCount: number };

export function ObjectBookingHistory({ reservationCount }: ObjectBookingHistoryProps) {
  // TODO: Connect booking history with search, sorting, pagination, and reservation details.
  return (
    <section
      aria-labelledby="object-booking-history-title"
      className="flex min-h-135 min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-organization-form"
    >
      <div className="flex min-h-19 flex-wrap items-center justify-between gap-3 px-6 py-4.5">
        <h2
          id="object-booking-history-title"
          className="text-lg leading-5 font-medium text-text-heading"
        >
          Історія бронювання
        </h2>
        <div className="flex max-w-full flex-wrap items-center gap-3">
          <div className="relative w-56 max-w-full">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-3 left-3 size-4 text-text-muted"
            />
            <Input
              disabled
              aria-label="Пошук бронювань"
              placeholder="Пошук…"
              className="h-10 rounded-2xl py-2 pr-3 pl-9"
            />
          </div>
          <Button type="button" disabled className="h-10">
            Пошук
          </Button>
          <Button type="button" disabled className="h-10 bg-background-gray">
            Очистити
          </Button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-16 text-center">
        <p className="text-[28px] leading-7 font-medium text-primary">
          {reservationCount === 0
            ? "На жаль, ще немає історії бронювань об’єкта"
            : "Історія бронювань буде доступна пізніше"}
        </p>
      </div>
      <div aria-hidden="true" className="h-20 shrink-0 border-t border-border" />
    </section>
  );
}
