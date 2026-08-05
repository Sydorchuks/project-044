import { cn } from "@/lib/utils";

type CompanyMarkProps = {
  prefix?: string;
  accent?: string;
  className?: string;
};

export function CompanyMark({
  prefix = "RESERV",
  accent = "NOW",
  className,
}: CompanyMarkProps) {
  return (
    <div className={cn("flex h-11 w-58.25 items-center overflow-visible", className)}>
      <div className="font-heading origin-left scale-x-[1.22] text-[23px] leading-none font-black tracking-[0.01em] italic">
        <span className="text-[#363636]">{prefix}</span>
        <span className="bg-[linear-gradient(95deg,#A28DF5_0%,#7961DB_52%,#4628C0_100%)] bg-clip-text text-transparent">
          {accent}
        </span>
      </div>
    </div>
  );
}
