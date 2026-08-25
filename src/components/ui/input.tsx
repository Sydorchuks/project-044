import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12.5 w-full min-w-0 rounded-[15px] border border-field-border bg-background px-5.5 py-4.25 font-sans text-[14px] leading-4 text-text-normal shadow-none transition-colors outline-none placeholder:text-field-placeholder focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-text-error aria-invalid:text-text-error aria-invalid:ring-3 aria-invalid:ring-text-error/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
