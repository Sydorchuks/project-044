"use client";

import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { createUser } from "@/features/users/api/users.api";
import {
  createUserSchema,
  type CreateUserFormValues,
} from "@/features/users/schemas/create-user-schema";
import type { CreateUserPayload } from "@/features/users/types/user.types";
import { type FormErrors, useFormState } from "@/hooks/use-form-state";
import { USER_ROLES } from "@/features/constants/user.constants";

export type CreateUserFormErrors = FormErrors<CreateUserFormValues>;
const initialValues: CreateUserFormValues = {
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
    schema: createUserSchema,
  });

  function redirectToUsers() {
    router.push("/users");
    router.refresh();
  }

  function handleCancel() {
    router.push("/users");
  }

  async function submitUser(values: CreateUserFormValues) {
    const payload = toCreateUserPayload(values);

    await createUser(payload);
    redirectToUsers();
  }

  const handleSubmit = createSubmitHandler(submitUser, getCreateUserError);

  return { values, errors, isSubmitting, setField, handleCancel, handleSubmit };
}

function toCreateUserPayload(values: CreateUserFormValues): CreateUserPayload {
  return {
    email: values.email.trim(),
    roleId: USER_ROLES.SUPER_ADMIN,
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
