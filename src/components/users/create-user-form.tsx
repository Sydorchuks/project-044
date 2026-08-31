"use client";

import { useCreateUserForm } from "@/features/users/hooks/use-create-user-form";
import { UserForm } from "./user-form";

type CreateUserFormProps = Readonly<{
  usersRoute: string;
}>;

export function CreateUserForm({ usersRoute }: CreateUserFormProps) {
  const { values, errors, isSubmitting, setField, handleCancel, handleSubmit } =
    useCreateUserForm(usersRoute);

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
