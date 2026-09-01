"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import { login } from "@/features/auth/api/auth-api";
import { getPostLoginRoute } from "@/features/auth/config/route-access";
import { saveAuthTokens } from "@/features/auth/lib/auth-storage";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/login-schema";

export type LoginFormErrors = Partial<Record<"email" | "password" | "form", string>>;

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

export function useLoginForm() {
  const router = useRouter();

  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateValue<Key extends keyof LoginFormValues>(key: Key, value: LoginFormValues[Key]) {
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

      const requestedRoute = new URLSearchParams(window.location.search).get("redirectTo");

      router.replace(getPostLoginRoute(data.account.role?.name, requestedRoute));
    } catch (error) {
      setErrors(getLoginError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    updateValue,
    handleSubmit,
  };
}
