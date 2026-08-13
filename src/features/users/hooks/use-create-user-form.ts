"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

import { createUser, getUsers } from "@/features/users/api/users.api";
import {
  createUserSchema,
  type CreateUserFormValues,
} from "@/features/users/schemas/create-user-schema";
import type { CreateUserPayload } from "@/features/users/types/user.types";

export type CreateUserFormErrors = Partial<
  Record<keyof CreateUserFormValues | "form", string>
>;

const SUPER_ADMIN_ROLE_ID = 1;

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

  const [values, setValues] = useState<CreateUserFormValues>(initialValues);
  const [errors, setErrors] = useState<CreateUserFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function setField(name: keyof CreateUserFormValues, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
      form: undefined,
    }));
  }

  function redirectToUsers() {
    router.push("/users");
    router.refresh();
  }

  function handleCancel() {
    router.push("/users");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = getValidationErrors(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = toCreateUserPayload(values);

    setIsSubmitting(true);
    setErrors({});

    try {
      await createUser(payload);
      redirectToUsers();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 500) {
        const created = await wasUserCreated(payload.email);

        if (created) {
          redirectToUsers();
          return;
        }
      }

      setErrors(getCreateUserError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return { values, errors, isSubmitting, setField, handleCancel, handleSubmit };
}

function getValidationErrors(values: CreateUserFormValues): CreateUserFormErrors {
  const result = createUserSchema.safeParse(values);

  if (result.success) {
    return {};
  }

  return result.error.issues.reduce<CreateUserFormErrors>((errors, issue) => {
    const field = issue.path[0];

    if (
      field === "firstName" ||
      field === "lastName" ||
      field === "phone" ||
      field === "email" ||
      field === "domainUrl" ||
      field === "description"
    ) {
      errors[field] = issue.message;
    }

    return errors;
  }, {});
}

function toCreateUserPayload(values: CreateUserFormValues): CreateUserPayload {
  return {
    email: values.email.trim(),
    roleId: SUPER_ADMIN_ROLE_ID,
    user: {
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      phone: values.phone.trim(),
      domain_url: values.domainUrl.trim(),
      description: values.description.trim() || undefined,
    },
  };
}

async function wasUserCreated(email: string) {
  try {
    const users = await getUsers({
      limit: 100,
      skip: 0,
      sort: "id:1",
    });

    return users.data.some((user) => user.account?.email === email);
  } catch {
    return false;
  }
}

function getCreateUserError(error: unknown): CreateUserFormErrors {
  if (isAxiosError(error)) {
    if (error.response?.status === 409) {
      return { form: "Користувач з такими даними вже існує" };
    }

    if (error.response?.status === 400) {
      return { form: "Перевірте заповнені поля" };
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      return { form: "Недостатньо прав для створення користувача" };
    }
  }

  return { form: "Не вдалося створити користувача. Спробуйте ще раз" };
}
