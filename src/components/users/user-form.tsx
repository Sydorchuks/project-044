"use client";

import { type ComponentProps, type FormEventHandler, useId } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getUserStatusLabel } from "@/features/users/lib/user-formatters";
import type { UserStatus } from "@/features/users/types/user.types";
import type { FormErrors } from "@/hooks/use-form-state";
import { cn } from "@/lib/utils";
import { UserFormValues } from "@/features/users/schemas/user-form-schema";

type UserFormMode = "create" | "edit";

type TextFieldConfig = {
  name: keyof Omit<UserFormValues, "description">;
  label: string;
  placeholder: string;
  autoComplete?: ComponentProps<"input">["autoComplete"];
};

type UserFormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

type UserFormProps = {
  mode: UserFormMode;
  values: UserFormValues;
  errors: FormErrors<UserFormValues>;
  isSubmitting: boolean;
  status?: UserStatus;
  isDeleting?: boolean;
  onFieldChange: <TName extends keyof UserFormValues>(
    name: TName,
    value: UserFormValues[TName],
  ) => void;
  onCancel: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onDelete?: () => void;
};

const textFields: TextFieldConfig[] = [
  {
    name: "firstName",
    label: "Імʼя*",
    placeholder: "Імʼя",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Прізвище*",
    placeholder: "Прізвище",
    autoComplete: "family-name",
  },
  {
    name: "phone",
    label: "Номер телефону*",
    placeholder: "+38 (__) ___-__-__",
    autoComplete: "tel",
  },
  {
    name: "email",
    label: "Електронна пошта*",
    placeholder: "Електронна пошта",
    autoComplete: "email",
  },
  {
    name: "domainUrl",
    label: "Назва компанії (URL-адреса домену .reservenow.com)*",
    placeholder: "Назва компанії",
  },
];

const fieldClassName =
  "h-11 rounded-[10px] border border-field-border bg-surface-muted px-4 font-sans text-[14px] leading-4 text-text-normal shadow-none placeholder:text-field-placeholder focus-visible:border-primary focus-visible:ring-primary/20 desktop:h-12.5 desktop:rounded-[12px] desktop:px-5 ultra:h-14 ultra:px-6";
const errorFieldClassName =
  "border-text-error text-text-error focus-visible:border-text-error focus-visible:ring-text-error/20";
const actionButtonClassName =
  "desktop:h-11 desktop:min-w-44 ultra:h-12 ultra:min-w-52 ultra:text-[16px] h-10 min-w-36 rounded-3xl font-sans text-[14px] font-bold";

export function UserForm({
  mode,
  values,
  errors,
  isSubmitting,
  status,
  isDeleting = false,
  onFieldChange,
  onCancel,
  onSubmit,
  onDelete,
}: UserFormProps) {
  const isEditMode = mode === "edit";
  const isBusy = isSubmitting || isDeleting;

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-115 desktop:max-w-140 ultra:max-w-170"
      noValidate
    >
      <Card className="rounded-3xl border-border bg-background shadow-sm">
        <CardContent className="p-6 desktop:p-8 ultra:p-10">
          <h2 className="mb-5 font-sans text-[16px] leading-5 font-bold text-primary desktop:text-[18px] desktop:leading-6 ultra:text-[22px]">
            Загальна інформація
          </h2>

          {errors.form && (
            <p className="mb-4 font-sans text-[14px] leading-4 text-text-error">{errors.form}</p>
          )}

          <div className="space-y-4 desktop:space-y-5 ultra:space-y-6">
            {textFields.map((field) => (
              <UserTextField
                key={field.name}
                field={field}
                value={values[field.name]}
                error={errors[field.name]}
                readOnly={isEditMode && field.name === "email"}
                onChange={(value) => onFieldChange(field.name, value)}
              />
            ))}

            <UserFormField label="Опис:" error={errors.description}>
              <textarea
                value={values.description}
                onChange={(event) => onFieldChange("description", event.target.value)}
                placeholder="Введіть опис"
                className={cn(
                  fieldClassName,
                  "min-h-32 w-full resize-none py-3 desktop:min-h-40 ultra:min-h-48",
                  errors.description && errorFieldClassName,
                )}
              />
            </UserFormField>

            {isEditMode && status && (
              <UserFormField label="Статус користувача">
                <Input
                  value={getUserStatusLabel(status)}
                  readOnly
                  aria-readonly="true"
                  className={cn(fieldClassName, "cursor-default")}
                />
              </UserFormField>
            )}
          </div>
        </CardContent>
      </Card>

      <div
        className={cn("mt-6 flex items-center gap-4 desktop:mt-7 ultra:mt-8", {
          "justify-between": isEditMode,
          "justify-end": !isEditMode,
        })}
      >
        {isEditMode && (
          <Button
            type="button"
            variant="outline"
            onClick={onDelete}
            disabled={isBusy}
            className={cn(
              actionButtonClassName,
              "border-text-muted bg-transparent text-text-muted hover:border-text-error hover:bg-text-error/10 hover:text-text-error",
            )}
          >
            Видалити
          </Button>
        )}

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isBusy}
            className={cn(
              actionButtonClassName,
              "border-text-error bg-transparent text-text-error hover:bg-text-error/10 hover:text-text-error",
            )}
          >
            Скасувати
          </Button>

          <Button
            type="submit"
            disabled={isBusy}
            className={cn(actionButtonClassName, "min-w-48 desktop:min-w-60 ultra:min-w-72")}
          >
            {getSubmitLabel(mode, isSubmitting)}
          </Button>
        </div>
      </div>
    </form>
  );
}

function UserTextField({
  field,
  value,
  error,
  readOnly,
  onChange,
}: {
  field: TextFieldConfig;
  value: string;
  error?: string;
  readOnly: boolean;
  onChange: (value: string) => void;
}) {
  const id = useId();

  return (
    <UserFormField label={field.label} error={error}>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        readOnly={readOnly}
        aria-readonly={readOnly}
        aria-invalid={Boolean(error)}
        className={cn(fieldClassName, readOnly && "cursor-default", error && errorFieldClassName)}
      />
    </UserFormField>
  );
}

function UserFormField({ label, error, children }: UserFormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[14px] leading-4 font-bold text-text-heading ultra:text-[16px]">
        {label}
      </span>

      {children}

      {error && (
        <span className="mt-1.5 block font-sans text-[12px] leading-4 text-text-error ultra:text-[14px]">
          {error}
        </span>
      )}
    </label>
  );
}

function getSubmitLabel(mode: UserFormMode, isSubmitting: boolean) {
  if (mode === "create") {
    return isSubmitting ? "Створення..." : "Додати користувача";
  }

  return isSubmitting ? "Збереження..." : "Зберегти";
}
