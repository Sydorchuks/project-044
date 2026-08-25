import { ComponentProps, ReactNode } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type LoginInputProps = ComponentProps<typeof Input> & {
  label: string;
  error?: string;
  errorId: string;
  endAdornment?: ReactNode;
};

export default function LoginInput({
  id,
  label,
  error,
  errorId,
  className,
  endAdornment,
  ...props
}: LoginInputProps) {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2.5">
        <label htmlFor={id} className="font-sans text-[14px] leading-4 text-text-heading">
          {label}
        </label>

        {error ? (
          <p id={errorId} className="font-sans text-[14px] leading-4 text-text-error">
            {error}
          </p>
        ) : null}
      </div>

      <div className="relative">
        <Input
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(endAdornment && "pr-12", className)}
          {...props}
        />

        {endAdornment ? (
          <div className="absolute top-1/2 right-5.5 -translate-y-1/2">{endAdornment}</div>
        ) : null}
      </div>
    </div>
  );
}
