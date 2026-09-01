import { CircleHelp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DECORATIVE_CIRCLE_CLASS_NAME = "pointer-events-none absolute hidden rounded-full xl:block";

const LABEL_TEXT_CLASS_NAME = "text-[14px] leading-4 font-medium";

export function SidebarHelpCard() {
  return (
    <div className="relative grid size-13.75 shrink-0 place-items-center overflow-hidden rounded-panel bg-primary font-sans xl:block xl:h-42.5 xl:w-54.5">
      <span
        aria-hidden="true"
        className={cn(
          DECORATIVE_CIRCLE_CLASS_NAME,
          "-top-16 left-33.75 size-36.5 bg-help-decoration-primary",
        )}
      />

      <span
        aria-hidden="true"
        className={cn(
          DECORATIVE_CIRCLE_CLASS_NAME,
          "-top-12.25 left-38.75 size-28 bg-help-decoration-secondary",
        )}
      />

      <span
        aria-hidden="true"
        className={cn(
          DECORATIVE_CIRCLE_CLASS_NAME,
          "-top-9 left-43.25 size-20 bg-help-decoration-tertiary",
        )}
      />

      <div className="relative z-10 grid place-items-center xl:absolute xl:top-4.5 xl:left-4 xl:flex xl:h-33.75 xl:w-46.5 xl:flex-col xl:items-start xl:gap-6">
        <Button
          type="button"
          variant="ghost"
          aria-label="FAQ"
          className="h-8.75 w-8.5 rounded-4xl border border-white p-0 text-white hover:bg-white/10 hover:text-white xl:w-24.75 xl:justify-start xl:gap-2 xl:px-2"
        >
          <CircleHelp aria-hidden="true" className="size-6" />

          <span className={cn("hidden xl:inline", LABEL_TEXT_CLASS_NAME)}>FAQ</span>
        </Button>

        <div className="hidden w-full flex-col gap-1.75 xl:flex">
          <div className="flex flex-col text-white">
            <p className={LABEL_TEXT_CLASS_NAME}>Потрібна допомога?</p>

            <p className="text-[12px] leading-3.5 font-normal">Будь ласка, звʼяжіться з нами</p>
          </div>

          <Button
            type="button"
            className={cn(
              "h-8.75 w-full rounded-4xl bg-white px-2 text-primary hover:bg-white/90",
              LABEL_TEXT_CLASS_NAME,
            )}
          >
            Звʼяжіться з нами
          </Button>
        </div>
      </div>
    </div>
  );
}
