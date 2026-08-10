import { MaskIcons } from "@/components/mask-icons";

type UserAvatarProps = {
  icon?: string;
};

export function UserAvatar({ icon = "/icons/person.svg" }: UserAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className="bg-primary grid size-10 place-items-center rounded-full transition-transform group-hover:scale-[1.04]"
    >
      <span className="bg-brand-soft grid size-8 place-items-center rounded-full">
        <span className="bg-surface-muted grid size-6 place-items-center rounded-full">
          <MaskIcons src={icon} className="bg-brand-soft size-4" />
        </span>
      </span>
    </span>
  );
}
