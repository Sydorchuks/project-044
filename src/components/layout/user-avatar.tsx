import { MaskIcons } from "@/components/mask-icons";

type UserAvatarProps = {
  icon?: string;
};

export function UserAvatar({ icon = "/icons/person.svg" }: UserAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className="grid size-10 place-items-center rounded-full bg-primary transition-transform group-hover:scale-[1.04]"
    >
      <span className="grid size-8 place-items-center rounded-full bg-brand-soft">
        <span className="grid size-6 place-items-center rounded-full bg-surface-muted">
          <MaskIcons src={icon} className="size-4 bg-brand-soft" />
        </span>
      </span>
    </span>
  );
}
