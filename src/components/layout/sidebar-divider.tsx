import { cn } from "@/lib/utils";

type SidebarDividerProps = {
  className?: string;
};

export function SidebarDivider({ className }: SidebarDividerProps) {
  return (
    <div
      className={cn(
        "h-px w-full bg-[linear-gradient(90deg,rgba(224,225,226,0)_0%,#E0E1E2_18%,#E0E1E2_82%,rgba(224,225,226,0)_100%)]",
        className,
      )}
    />
  );
}
