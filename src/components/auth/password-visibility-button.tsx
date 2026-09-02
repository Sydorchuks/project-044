import { Eye, EyeOff } from "lucide-react";

type PasswordVisibilityButtonProps = Readonly<{
  isVisible: boolean;
  onToggle: () => void;
}>;

export function PasswordVisibilityButton({ isVisible, onToggle }: PasswordVisibilityButtonProps) {
  return (
    <button
      type="button"
      aria-label={isVisible ? "Сховати пароль" : "Показати пароль"}
      onClick={onToggle}
      className="grid size-4 place-items-center text-text-normal transition-colors outline-none hover:text-primary focus-visible:text-primary"
    >
      {isVisible ? (
        <EyeOff className="size-4" aria-hidden="true" />
      ) : (
        <Eye className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
