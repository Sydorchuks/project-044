import { MaskIcons } from "@/components/mask-icons";

type UserAvatarProps = {
  icon?: string;
};

export function UserAvatar({ icon = "/icons/person.svg" }: UserAvatarProps) {
  return (
    <span className="grid size-10 place-items-center rounded-full bg-[#7961DB] transition-transform group-hover:scale-[1.04]">
      <span className="grid size-8 place-items-center rounded-full bg-[#BDADFF]">
        <span className="grid size-6 place-items-center rounded-full bg-[#F6F7F9]">
          <MaskIcons src={icon} className="size-4 bg-[#BDADFF]" />
        </span>
      </span>
    </span>
  );
}
