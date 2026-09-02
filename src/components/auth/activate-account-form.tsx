"use client";

import { useId } from "react";

import { Button } from "@/components/ui/button";
import { useActivateAccountForm } from "@/features/auth/hooks/use-activate-account-form";
import { PasswordInput } from "./password-input";

type ActivateAccountFormProps = Readonly<{
  verifyToken?: string;
}>;

export function ActivateAccountForm({ verifyToken }: ActivateAccountFormProps) {
  const passwordId = useId();
  const confirmPasswordId = useId();
  const passwordErrorId = useId();
  const confirmPasswordErrorId = useId();
  const { values, errors, isSubmitting, setField, handleSubmit } =
    useActivateAccountForm(verifyToken);

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="mb-8.5">
        <h1 className="font-sans text-[32px] leading-9.5 font-bold text-primary">
          Активація акаунта
        </h1>

        <p className="mt-2 font-sans text-[14px] leading-4 text-text-normal">
          Створіть пароль для входу
          <br />
          до Project name
        </p>
      </div>

      {!verifyToken ? (
        <p className="mb-4 font-sans text-[14px] leading-4 text-text-error">
          Посилання для активації некоректне
        </p>
      ) : null}

      {errors.form ? (
        <p className="mb-4 font-sans text-[14px] leading-4 text-text-error">{errors.form}</p>
      ) : null}

      <div className="flex flex-col gap-6.25">
        <PasswordInput
          id={passwordId}
          label="Пароль*"
          error={errors.password}
          errorId={passwordErrorId}
          autoComplete="new-password"
          value={values.password}
          placeholder="Створіть пароль"
          disabled={!verifyToken || isSubmitting}
          onChange={(event) => setField("password", event.target.value)}
        />

        <PasswordInput
          id={confirmPasswordId}
          label="Підтвердження пароля*"
          error={errors.confirmPassword}
          errorId={confirmPasswordErrorId}
          autoComplete="new-password"
          value={values.confirmPassword}
          placeholder="Повторіть пароль"
          disabled={!verifyToken || isSubmitting}
          onChange={(event) => setField("confirmPassword", event.target.value)}
        />
      </div>

      <Button
        type="submit"
        disabled={!verifyToken || isSubmitting}
        className="mt-6.25 h-13.5 w-full rounded-[15px] bg-primary font-sans text-[14px] font-bold text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting ? "Активація..." : "Активувати акаунт"}
      </Button>
    </form>
  );
}
