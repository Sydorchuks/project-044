import { cn } from "@/lib/utils";

type SidebarDividerProps = {
  className?: string;
};

export function SidebarDivider({ className }: SidebarDividerProps) {
  return (
    <div
      className={cn(
        "h-px w-full bg-[linear-gradient(90deg,transparent_0%,var(--border)_18%,var(--border)_82%,transparent_100%)]",
        className,
      )}
    />
  );
}
