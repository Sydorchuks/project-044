"use client";

import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

import {
  createOrganization,
  deleteOrganization,
  deleteOrganizationImage,
  updateOrganization,
  uploadOrganizationImage,
} from "@/features/organizations/api/organizations.api";
import {
  getOrganizationFormValues,
  toOrganizationPayload,
} from "@/features/organizations/lib/organization-form.utils";
import type { Organization } from "@/features/organizations/schemas/organization.schema";
import { organizationFormSchema } from "@/features/organizations/schemas/organization-form.schema";
import type { OrganizationFormValues } from "@/features/organizations/types/organization-form.types";
import { type FormErrors, useFormState } from "@/hooks/use-form-state";
import { useNavigationBlocker } from "@/hooks/use-navigation-blocker";

type UseOrganizationFormOptions = {
  organization?: Organization;
};

type OrganizationDialog =
  | { type: "save"; values: OrganizationFormValues }
  | { type: "discard"; href: string }
  | { type: "delete" }
  | { type: "removeImage" };

export function useOrganizationForm({ organization }: UseOrganizationFormOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [initialValues] = useState(() => getOrganizationFormValues(organization));
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [dialog, setDialog] = useState<OrganizationDialog | null>(null);
  const [dialogError, setDialogError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const operationRef = useRef(false);

  const {
    values,
    errors,
    isSubmitting: isValidating,
    setField,
    createSubmitHandler,
  } = useFormState({
    initialValues,
    schema: organizationFormSchema,
  });

  const isSubmitting = isValidating || isProcessing || isNavigating;
  const isDirty =
    JSON.stringify(values) !== JSON.stringify(initialValues) || Boolean(image) || isImageRemoved;

  const handleNavigationBlocked = useCallback((href: string) => {
    setDialogError("");
    setDialog({ type: "discard", href });
  }, []);

  useNavigationBlocker({
    enabled: isDirty && !isSubmitting,
    onBlock: handleNavigationBlocked,
  });

  function navigate(href: string) {
    setIsNavigating(true);
    setDialog(null);
    router.push(href);
  }

  function handleCancel() {
    if (isSubmitting) {
      return;
    }

    const href = organization ? `/organizations/${organization.id}` : "/organizations";

    if (isDirty) {
      handleNavigationBlocked(href);
      return;
    }

    navigate(href);
  }

  function handleImageChange(file: File | null) {
    if (isSubmitting) {
      return;
    }

    const error = getImageError(file);

    setImage(error ? null : file);
    setImageError(error);
  }

  async function submitOrganization(values: OrganizationFormValues) {
    const payload = toOrganizationPayload(values);
    const savedOrganization = organization
      ? await updateOrganization(organization.id, payload)
      : await createOrganization(payload);

    let imageUploadFailed = false;

    if (image || isImageRemoved) {
      try {
        if (image) {
          await uploadOrganizationImage(savedOrganization.id, image);
        } else {
          await deleteOrganizationImage(savedOrganization.id);
        }
      } catch {
        imageUploadFailed = true;
      }
    }

    await queryClient.invalidateQueries({ queryKey: ["organizations"], refetchType: "none" });

    const destination = new URL(`/organizations/${savedOrganization.id}`, window.location.origin);

    if (imageUploadFailed) {
      destination.searchParams.set("imageUpload", "failed");
    }

    navigate(`${destination.pathname}${destination.search}`);
  }

  async function requestSave(validatedValues: OrganizationFormValues) {
    if (organization) {
      setDialogError("");
      setDialog({ type: "save", values: validatedValues });
      return;
    }

    await submitOrganization(validatedValues);
  }

  function handleDeleteRequest() {
    if (organization && !isSubmitting) {
      setDialogError("");
      setDialog({ type: "delete" });
    }
  }

  function handleImageDeleteRequest() {
    if (organization?.photo && !isSubmitting) {
      setDialogError("");
      setDialog({ type: "removeImage" });
    }
  }

  function handleImageRestore() {
    if (!isSubmitting) {
      setIsImageRemoved(false);
    }
  }

  function handleDialogOpenChange(open: boolean) {
    if (!open && !isSubmitting && !operationRef.current) {
      setDialog(null);
      setDialogError("");
    }
  }

  async function handleConfirm() {
    if (!dialog || isSubmitting || operationRef.current) {
      return;
    }

    if (dialog.type === "discard") {
      navigate(dialog.href);
      return;
    }

    if (dialog.type === "removeImage") {
      setImage(null);
      setImageError("");
      setIsImageRemoved(true);
      setDialog(null);
      return;
    }

    operationRef.current = true;
    setIsProcessing(true);
    setDialogError("");

    try {
      if (dialog.type === "save") {
        await submitOrganization(dialog.values);
      } else if (organization) {
        await deleteOrganization(organization.id);
        queryClient.setQueryData<Organization[]>(["organizations"], (current) =>
          current?.filter((item) => item.id !== organization.id),
        );
        await queryClient.invalidateQueries({ queryKey: ["organizations"], refetchType: "none" });
        navigate("/organizations");
      }
    } catch (error) {
      setDialogError(
        dialog.type === "save"
          ? (getOrganizationFormError(error).form ?? "Не вдалося зберегти організацію")
          : getOrganizationDeleteError(error),
      );
    } finally {
      operationRef.current = false;
      setIsProcessing(false);
    }
  }

  const handleSubmit = createSubmitHandler(requestSave, getOrganizationFormError);

  return {
    values,
    errors,
    image,
    imageError,
    isSubmitting,
    isImageRemoved,
    dialog,
    dialogError,
    setField,
    handleCancel,
    handleImageChange,
    handleSubmit,
    handleDeleteRequest,
    handleImageDeleteRequest,
    handleImageRestore,
    handleDialogOpenChange,
    handleConfirm,
  };
}

function getOrganizationDeleteError(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return "Недостатньо прав для видалення організації";
    }

    if (error.response?.status === 404 || error.response?.status === 409) {
      return "Організацію не знайдено";
    }
  }

  return "Не вдалося видалити організацію. Спробуйте ще раз";
}

function getImageError(file: File | null) {
  if (!file) {
    return "";
  }

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    return "Підтримуються лише JPG та PNG";
  }

  return file.size > 20_000_000 ? "Максимальний розмір зображення — 20 МБ" : "";
}

function getOrganizationFormError(error: unknown): FormErrors<OrganizationFormValues> {
  if (isAxiosError(error)) {
    if (error.response?.status === 400) {
      return { form: "Перевірте заповнені поля та години роботи" };
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      return { form: "Недостатньо прав для збереження організації" };
    }

    if (error.response?.status === 409) {
      return { form: "Організацію не знайдено" };
    }
  }

  return { form: "Не вдалося зберегти організацію. Спробуйте ще раз" };
}
