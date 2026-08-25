import { cn } from "@/lib/utils";

type CompanyMarkProps = {
  prefix?: string;
  accent?: string;
  prefixColor?: string;
  accentFrom?: string;
  accentVia?: string;
  accentTo?: string;
  className?: string;
};

export function CompanyMark({
  prefix = "RESERV",
  accent = "NOW",
  prefixColor = "var(--brand-foreground)",
  accentFrom = "var(--brand-light)",
  accentVia = "var(--primary)",
  accentTo = "var(--brand-dark)",
  className,
}: CompanyMarkProps) {
  return (
    <div
      className={cn(
        "flex h-5 w-72.5 items-center overflow-visible font-brand text-[28px] leading-none tracking-[0.01em]",
        className,
      )}
    >
      <span style={{ color: prefixColor }}>{prefix}</span>

      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(95deg, ${accentFrom} 0%, ${accentVia} 52%, ${accentTo} 100%)`,
        }}
      >
        {accent}
      </span>
    </div>
  );
}
