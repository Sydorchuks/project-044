import { MaskIcons } from "@/components/mask-icons";
import type { NavigationIcon as NavigationIconType } from "@/config/navigation";
import { cn } from "@/lib/utils";

type NavigationIconProps = Readonly<{
  icon: NavigationIconType;
  className?: string;
}>;

export function NavigationIcon({ icon, className }: NavigationIconProps) {
  if (icon.type === "mask") {
    return <MaskIcons src={icon.src} className={cn("block bg-current", className)} />;
  }

  const Icon = icon.component;

  return <Icon aria-hidden="true" className={className} />;
}
