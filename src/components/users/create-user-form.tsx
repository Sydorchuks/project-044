"use client";

import { useCreateUserForm } from "@/features/users/hooks/use-create-user-form";
import { UserForm } from "./user-form";

export function CreateUserForm() {
  const { values, errors, isSubmitting, setField, handleCancel, handleSubmit } =
    useCreateUserForm();

  return (
    <UserForm
      mode="create"
      values={values}
      errors={errors}
      isSubmitting={isSubmitting}
      onFieldChange={setField}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
}
