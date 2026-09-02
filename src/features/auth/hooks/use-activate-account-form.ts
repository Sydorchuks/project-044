"use client";

import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

import { verifyAccount } from "@/features/auth/api/auth-api";
import {
  activateAccountSchema,
  type ActivateAccountFormValues,
} from "@/features/auth/schemas/activate-account-schema";
import { type FormErrors, useFormState } from "@/hooks/use-form-state";

const initialValues: ActivateAccountFormValues = {
  password: "",
  confirmPassword: "",
};

export function useActivateAccountForm(verifyToken?: string) {
  const router = useRouter();
  const { values, errors, isSubmitting, setField, createSubmitHandler } = useFormState({
    initialValues,
    schema: activateAccountSchema,
  });

  async function submitAccount({ password }: ActivateAccountFormValues) {
    if (!verifyToken) {
      throw new Error("Missing verification token");
    }

    await verifyAccount(verifyToken, password);
    router.replace("/login?activated=true");
  }

  const handleSubmit = createSubmitHandler(submitAccount, getActivationError);

  return { values, errors, isSubmitting, setField, handleSubmit };
}

function getActivationError(error: unknown): FormErrors<ActivateAccountFormValues> {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) {
      return { form: "Посилання для активації недійсне або протерміноване" };
    }

    if (error.response?.status === 400) {
      return { form: "Перевірте введений пароль" };
    }
  }

  return { form: "Не вдалося активувати акаунт. Спробуйте ще раз" };
}
