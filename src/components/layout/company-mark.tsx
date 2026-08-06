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
  prefixColor = "#363636",
  accentFrom = "#A28DF5",
  accentVia = "#7961DB",
  accentTo = "#4628C0",
  className,
}: CompanyMarkProps) {
  return (
    <div
      className={cn(
        "font-brand flex h-5 w-72.5 items-center overflow-visible text-[28px] leading-none tracking-[0.01em]",
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
