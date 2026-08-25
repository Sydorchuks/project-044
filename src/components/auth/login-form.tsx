"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLoginForm } from "@/features/auth/hooks/use-login-form";
import LoginInput from "./login-input";

export function LoginForm() {
  const emailId = useId();
  const passwordId = useId();
  const emailErrorId = useId();
  const passwordErrorId = useId();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { values, errors, isSubmitting, updateValue, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="mb-8.5">
        <h1 className="font-sans text-[32px] leading-9.5 font-bold text-primary">
          Увійти до Project name
        </h1>

        <p className="mt-2 font-sans text-[14px] leading-4 text-text-normal">
          Введіть адресу електронної пошти та пароль
          <br />
          для входу!
        </p>
      </div>

      {errors.form ? (
        <p className="mb-4 font-sans text-[14px] leading-4 text-text-error">{errors.form}</p>
      ) : null}

      <div className="flex flex-col gap-6.25">
        <LoginInput
          id={emailId}
          label="Електронна пошта*"
          error={errors.email}
          errorId={emailErrorId}
          type="email"
          autoComplete="email"
          value={values.email}
          placeholder="Ваша електронна адреса"
          onChange={(event) => updateValue("email", event.target.value)}
        />

        <LoginInput
          id={passwordId}
          label="Пароль*"
          error={errors.password}
          errorId={passwordErrorId}
          type={isPasswordVisible ? "text" : "password"}
          autoComplete="current-password"
          value={values.password}
          placeholder="Ваш пароль"
          onChange={(event) => updateValue("password", event.target.value)}
          endAdornment={
            <button
              type="button"
              aria-label={isPasswordVisible ? "Сховати пароль" : "Показати пароль"}
              onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
              className="grid size-4 place-items-center text-text-normal transition-colors outline-none hover:text-primary focus-visible:text-primary"
            >
              {isPasswordVisible ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          }
        />
      </div>

      <label className="mt-6.25 flex w-fit items-center gap-2 font-sans text-[14px] leading-4 text-text-normal">
        <Checkbox
          checked={values.remember}
          onCheckedChange={(checked) => updateValue("remember", checked === true)}
          className="size-4 rounded-lg border-field-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
        />
        Памʼятай мене
      </label>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-6.25 h-13.5 w-full rounded-[15px] bg-primary font-sans text-[14px] font-bold text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting ? "Вхід..." : "Увійти"}
      </Button>
    </form>
  );
}
