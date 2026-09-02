"use client";

import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { createUser } from "@/features/users/api/users.api";
import { userFormSchema, type UserFormValues } from "@/features/users/schemas/user-form-schema";
import { saveActivationUrl } from "@/features/users/lib/activation-link";
import type { CreateUserPayload } from "@/features/users/types/user.types";
import { type FormErrors, useFormState } from "@/hooks/use-form-state";

export type CreateUserFormErrors = FormErrors<UserFormValues>;
const initialValues: UserFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  domainUrl: "",
  description: "",
};

export function useCreateUserForm() {
  const router = useRouter();

  const { values, errors, isSubmitting, setField, createSubmitHandler } = useFormState({
    initialValues,
    schema: userFormSchema,
  });

  function redirectToUsers() {
    router.push("/users");
    router.refresh();
  }

  function handleCancel() {
    router.push("/users");
  }

  async function submitUser(values: UserFormValues) {
    const payload = toCreateUserPayload(values);
    const result = await createUser(payload);

    if (process.env.NODE_ENV === "development" && result.verify_token) {
      const activationUrl = new URL("/activate-account", window.location.origin);

      activationUrl.searchParams.set("verify_token", result.verify_token);
      saveActivationUrl(activationUrl.toString());
    }

    redirectToUsers();
  }

  const handleSubmit = createSubmitHandler(submitUser, getCreateUserError);

  return { values, errors, isSubmitting, setField, handleCancel, handleSubmit };
}

function toCreateUserPayload(values: UserFormValues): CreateUserPayload {
  return {
    email: values.email.trim(),
    user: {
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      phone: values.phone.trim(),
      domain_url: values.domainUrl.trim(),
      description: values.description.trim() || undefined,
    },
  };
}

function getCreateUserError(error: unknown): CreateUserFormErrors {
  if (isAxiosError(error)) {
    if (error.response?.status === 409) {
      return {
        form: "Користувач з такими даними вже існує",
      };
    }

    if (error.response?.status === 400) {
      return {
        form: "Перевірте заповнені поля",
      };
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      return {
        form: "Недостатньо прав для створення користувача",
      };
    }
  }

  return {
    form: "Не вдалося створити користувача. Спробуйте ще раз",
  };
}
