"use client";

import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useId,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { login } from "@/features/auth/api/auth-api";
import { saveAuthTokens } from "@/features/auth/lib/auth-storage";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login-schema";
import { cn } from "@/lib/utils";

type LoginFormErrors = Partial<Record<"email" | "password" | "form", string>>;

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  remember: true,
};

function getValidationErrors(values: LoginFormValues): LoginFormErrors {
  const result = loginSchema.safeParse(values);

  if (result.success) {
    return {};
  }

  return result.error.issues.reduce<LoginFormErrors>((errors, issue) => {
    const field = issue.path[0];

    if (field === "email" || field === "password") {
      errors[field] = issue.message;
    }

    return errors;
  }, {});
}

function getLoginError(error: unknown): LoginFormErrors {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      return { password: "Невірний пароль" };
    }

    if (error.response?.status === 403) {
      return { form: "Акаунт не активний" };
    }

    if (error.response?.status === 400) {
      return { form: "Перевірте електронну пошту та пароль" };
    }
  }

  return { form: "Не вдалося увійти. Спробуйте ще раз" };
}

type LoginInputProps = ComponentProps<typeof Input> & {
  label: string;
  error?: string;
  errorId: string;
  endAdornment?: ReactNode;
};

function LoginInput({
  id,
  label,
  error,
  errorId,
  className,
  endAdornment,
  ...props
}: LoginInputProps) {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2.5">
        <label
          htmlFor={id}
          className="text-text-heading font-sans text-[14px] leading-4"
        >
          {label}
        </label>

        {error ? (
          <p id={errorId} className="text-text-error font-sans text-[14px] leading-4">
            {error}
          </p>
        ) : null}
      </div>

      <div className="relative">
        <Input
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(endAdornment && "pr-12", className)}
          {...props}
        />

        {endAdornment ? (
          <div className="absolute top-1/2 right-5.5 -translate-y-1/2">
            {endAdornment}
          </div>
        ) : null}
      </div>
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
      ...(key === "email" || key === "password" ? { [key]: undefined } : {}),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = getValidationErrors(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await login({
        email: values.email.trim(),
        password: values.password,
      });

      saveAuthTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        rememberMe: values.remember,
      });

      router.push("/");
    } catch (error) {
      setErrors(getLoginError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="mb-8.5">
        <h1 className="text-primary font-sans text-[32px] leading-9.5 font-bold">
          Увійти до Project name
        </h1>

        <p className="text-text-normal mt-2 font-sans text-[14px] leading-4">
          Введіть адресу електронної пошти та пароль
          <br />
          для входу!
        </p>
      </div>

      {errors.form ? (
        <p className="text-text-error mb-4 font-sans text-[14px] leading-4">
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
          endAdornment={
            <button
              type="button"
              aria-label={isPasswordVisible ? "Сховати пароль" : "Показати пароль"}
              onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
              className="text-text-normal hover:text-primary focus-visible:text-primary grid size-4 place-items-center transition-colors outline-none"
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

      <label className="text-text-normal mt-6.25 flex w-fit items-center gap-2 font-sans text-[14px] leading-4">
        <Checkbox
          checked={values.remember}
          onCheckedChange={(checked) => updateValue("remember", checked === true)}
          className="border-field-border data-[state=checked]:border-primary data-[state=checked]:bg-primary size-4 rounded-lg"
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
