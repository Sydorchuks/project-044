"use client";

import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { UserForm } from "@/components/users/user-form";
import { useEditUserForm } from "@/features/users/hooks/use-edit-user-form";
import type { User } from "@/features/users/types/user.types";

type EditUserFormProps = {
  user: User;
};

export function EditUserForm({ user }: EditUserFormProps) {
  const {
    values,
    errors,
    isSubmitting,
    isSaving,
    saveError,
    isSaveDialogOpen,
    isCloseDialogOpen,
    isDeleting,
    deleteError,
    isDeleteDialogOpen,
    setField,
    handleCancel,
    handleSaveDialogOpenChange,
    handleCloseDialogOpenChange,
    handleSave,
    handleSaveBeforeClose,
    handleDeleteRequest,
    handleDeleteDialogOpenChange,
    handleDelete,
    handleSubmit,
  } = useEditUserForm(user);

  return (
    <>
      <UserForm
        mode="edit"
        values={values}
        errors={errors}
        isSubmitting={isSubmitting}
        isDeleting={isDeleting}
        status={user.account.status}
        onFieldChange={setField}
        onCancel={handleCancel}
        onDelete={handleDeleteRequest}
        onSubmit={handleSubmit}
      />

      <ConfirmationDialog
        open={isSaveDialogOpen}
        message="Ви хочете зберегти зміни?"
        description="Якщо ви не збережете, ваші зміни будуть втрачені"
        confirmLabel="Зберегти"
        isPending={isSaving}
        error={saveError}
        onOpenChange={handleSaveDialogOpenChange}
        onConfirm={handleSave}
        title="Підтвердження"
      />

      <ConfirmationDialog
        open={isCloseDialogOpen}
        message="Ви хочете зберегти зміни перед закриттям?"
        description="Якщо ви не збережете, ваші зміни будуть втрачені"
        confirmLabel="Зберегти"
        isPending={isSaving}
        error={saveError}
        onOpenChange={handleCloseDialogOpenChange}
        onConfirm={handleSaveBeforeClose}
        title="Підтвердження"
      />

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        message="Ви напевно хочете видалити користувача?"
        description="Якщо ви видалите користувача, йому буде призначений статус «Видалений» назавжди."
        confirmLabel="Видалити"
        isPending={isDeleting}
        error={deleteError}
        onOpenChange={handleDeleteDialogOpenChange}
        onConfirm={handleDelete}
        title="Підтвердження"
      />
    </>
  );
}
