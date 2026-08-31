"use client";

import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { deleteUser, updateUser } from "@/features/users/api/users.api";
import { userFormSchema, type UserFormValues } from "@/features/users/schemas/user-form-schema";
import type { UpdateUserPayload, User } from "@/features/users/types/user.types";
import { UserStatus } from "@/features/users/types/user.types";
import { type FormErrors, useFormState } from "@/hooks/use-form-state";
import { useNavigationBlocker } from "@/hooks/use-navigation-blocker";

export type EditUserFormErrors = FormErrors<UserFormValues>;

export function useEditUserForm(user: User, usersRoute: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const initialValues = useMemo(() => toUserFormValues(user), [user]);

  const {
    values,
    errors,
    isDirty,
    isSubmitting: isValidating,
    setField,
    createSubmitHandler,
  } = useFormState({
    initialValues,
    schema: userFormSchema,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const isSubmitting = isValidating || isSaving;
  const isBusy = isSubmitting || isDeleting;

  const handleNavigationBlocked = useCallback((href: string) => {
    setSaveError("");
    setPendingHref(href);
    setIsCloseDialogOpen(true);
  }, []);

  useNavigationBlocker({
    enabled: isDirty && !isBusy,
    onBlock: handleNavigationBlocked,
  });

  function redirectToUsers() {
    router.push(usersRoute);
  }

  function handleCancel() {
    if (!isDirty) {
      redirectToUsers();
      return;
    }

    setSaveError("");
    setPendingHref(usersRoute);
    setIsCloseDialogOpen(true);
  }

  async function handleSaveRequest() {
    if (!isDirty) {
      return;
    }

    setSaveError("");
    setIsSaveDialogOpen(true);
  }

  function handleSaveDialogOpenChange(open: boolean) {
    setIsSaveDialogOpen(open);

    if (!open) {
      setSaveError("");
    }
  }

  function handleCloseDialogOpenChange(open: boolean) {
    setIsCloseDialogOpen(open);

    if (!open) {
      setSaveError("");
      setPendingHref(null);
    }
  }

  async function saveChanges(href: string) {
    setIsSaving(true);
    setSaveError("");

    try {
      await updateUser(user.id, toUpdateUserPayload(values));

      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      setIsSaveDialogOpen(false);
      setIsCloseDialogOpen(false);
      setPendingHref(null);

      router.push(href);
    } catch (error) {
      setSaveError(getUpdateUserErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSave() {
    await saveChanges(usersRoute);
  }

  async function handleSaveBeforeClose() {
    await saveChanges(pendingHref ?? usersRoute);
  }

  function handleDeleteRequest() {
    setDeleteError("");
    setIsDeleteDialogOpen(true);
  }

  function handleDeleteDialogOpenChange(open: boolean) {
    setIsDeleteDialogOpen(open);

    if (!open) {
      setDeleteError("");
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteUser(user.id);

      queryClient.setQueryData<User>(["users", "detail", user.id], (currentUser) => {
        if (!currentUser) {
          return currentUser;
        }

        return {
          ...currentUser,
          account: {
            ...currentUser.account,
            status: UserStatus.DELETED,
          },
        };
      });

      await queryClient.invalidateQueries({
        queryKey: ["users"],
        refetchType: "none",
      });

      setIsDeleteDialogOpen(false);
    } catch (error) {
      setDeleteError(getDeleteUserError(error));
    } finally {
      setIsDeleting(false);
    }
  }

  const handleSubmit = createSubmitHandler(handleSaveRequest, getUpdateUserError);

  return {
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
  };
}

function toUserFormValues(user: User): UserFormValues {
  return {
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
    email: user.account.email,
    domainUrl: user.domain_url ?? "",
    description: user.description ?? "",
  };
}

function toUpdateUserPayload(values: UserFormValues): UpdateUserPayload {
  return {
    first_name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    phone: values.phone.trim(),
    domain_url: values.domainUrl.trim(),
    description: values.description.trim() || null,
  };
}

function getUpdateUserError(error: unknown): EditUserFormErrors {
  return {
    form: getUpdateUserErrorMessage(error),
  };
}

function getUpdateUserErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response?.status === 400) {
      return "Перевірте заповнені поля";
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      return "Недостатньо прав для редагування користувача";
    }

    if (error.response?.status === 409) {
      return "Користувача не знайдено";
    }
  }

  return "Не вдалося зберегти зміни. Спробуйте ще раз";
}

function getDeleteUserError(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return "Недостатньо прав для видалення користувача";
    }

    if (error.response?.status === 409) {
      return "Користувача не знайдено";
    }
  }

  return "Не вдалося видалити користувача. Спробуйте ще раз";
}
