"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import LoginInput, { type LoginInputProps } from "./login-input";

type PasswordInputProps = Omit<LoginInputProps, "type" | "endAdornment">;

export function PasswordInput(props: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <LoginInput
      {...props}
      type={isVisible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          aria-label={isVisible ? "Сховати пароль" : "Показати пароль"}
          onClick={() => setIsVisible((isPasswordVisible) => !isPasswordVisible)}
          className="grid size-4 place-items-center text-text-normal transition-colors outline-none hover:text-primary focus-visible:text-primary"
        >
          {isVisible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      }
    />
  );
}
