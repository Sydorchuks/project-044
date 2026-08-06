"use client";

import { type ComponentProps, type FormEvent, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

type LoginFormErrors = Partial<Record<"email" | "password" | "form", string>>;

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  remember: true,
};

const inputClassName =
  "h-12.5 rounded-[15px] border-[#ABB3BF] bg-background px-5.5 py-4.25 font-sans text-[14px] leading-4 text-[#1C2127] shadow-none placeholder:text-[#ABB3BF] focus-visible:border-primary focus-visible:ring-primary/20";

const errorInputClassName =
  "border-[#AC2F33] text-[#AC2F33] focus-visible:border-[#AC2F33] focus-visible:ring-[#AC2F33]/20";

function validateLoginForm(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = "Введіть електронну пошту";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Некоректна електронна пошта";
  }

  if (!values.password) {
    errors.password = "Введіть пароль";
  }

  return errors;
}

type LoginInputProps = ComponentProps<typeof Input> & {
  label: string;
  error?: string;
  errorId: string;
};

function LoginInput({
  id,
  label,
  error,
  errorId,
  className,
  ...props
}: LoginInputProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2.5">
        <label htmlFor={id} className="font-sans text-[14px] leading-4 text-[#111418]">
          {label}
        </label>

        {error ? (
          <p id={errorId} className="font-sans text-[14px] leading-4 text-[#AC2F33]">
            {error}
          </p>
        ) : null}
      </div>

      <Input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClassName, error && errorInputClassName, className)}
        {...props}
      />
    </div>
  );
}

export function LoginForm() {
  const router = useRouter();

  const emailId = useId();
  const passwordId = useId();
  const emailErrorId = useId();
  const passwordErrorId = useId();

  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateValue<Key extends keyof LoginFormValues>(
    key: Key,
    value: LoginFormValues[Key],
  ) {
    setValues((currentValues) => ({ ...currentValues, [key]: value }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      form: undefined,
      ...(key === "email" || key === "password" ? { [key]: undefined } : null),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateLoginForm(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="mb-8.5">
        <h1 className="text-primary font-sans text-[32px] leading-9.5 font-bold">
          Увійти до Project name
        </h1>

        <p className="mt-2 font-sans text-[14px] leading-4 text-[#1C2127]">
          Введіть адресу електронної пошти та пароль
          <br />
          для входу!
        </p>
      </div>

      {errors.form ? (
        <p className="mb-4 font-sans text-[14px] leading-4 text-[#AC2F33]">
          {errors.form}
        </p>
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
          className="pr-12"
        />

        <button
          type="button"
          aria-label={isPasswordVisible ? "Сховати пароль" : "Показати пароль"}
          onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
          className="hover:text-primary focus-visible:text-primary -mt-14.5 mr-5.5 ml-auto grid size-4 place-items-center text-[#1C2127] transition-colors outline-none"
        >
          {isPasswordVisible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <label className="mt-6.25 flex w-fit items-center gap-2 font-sans text-[14px] leading-4 text-[#1C2127]">
        <Checkbox
          checked={values.remember}
          onCheckedChange={(checked) => updateValue("remember", checked === true)}
          className="data-[state=checked]:border-primary data-[state=checked]:bg-primary size-4 rounded-lg border-[#ABB3BF]"
        />
        Памʼятай мене
      </label>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6.25 h-13.5 w-full rounded-[15px] font-sans text-[14px] font-bold"
      >
        {isSubmitting ? "Вхід..." : "Увійти"}
      </Button>
    </form>
  );
}
