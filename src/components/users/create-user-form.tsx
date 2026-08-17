"use client";

import { type ComponentProps, useId } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreateUserForm } from "@/features/users/hooks/use-create-user-form";
import type { CreateUserFormValues } from "@/features/users/schemas/create-user-schema";
import { cn } from "@/lib/utils";

type TextFieldConfig = {
  name: keyof Omit<CreateUserFormValues, "description">;
  label: string;
  placeholder: string;
  autoComplete?: ComponentProps<"input">["autoComplete"];
};

type CreateUserFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
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

export function CreateUserForm() {
  const { values, errors, isSubmitting, setField, handleCancel, handleSubmit } =
    useCreateUserForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="desktop:max-w-140 ultra:max-w-170 w-full max-w-115"
      noValidate
    >
      <Card className="border-border bg-background rounded-3xl shadow-sm">
        <CardContent className="desktop:p-8 ultra:p-10 p-6">
          <h2 className="text-primary desktop:text-[18px] desktop:leading-6 ultra:text-[22px] mb-5 font-sans text-[16px] leading-5 font-bold">
            Загальна інформація
          </h2>

          {errors.form && (
            <p className="text-text-error mb-4 font-sans text-[14px] leading-4">
              {errors.form}
            </p>
          )}

          <div className="desktop:space-y-5 ultra:space-y-6 space-y-4">
            {textFields.map((field) => (
              <CreateUserTextField
                key={field.name}
                field={field}
                value={values[field.name]}
                error={errors[field.name]}
                onChange={(value) => setField(field.name, value)}
              />
            ))}

            <CreateUserField label="Опис:" error={errors.description}>
              <textarea
                value={values.description}
                onChange={(event) => setField("description", event.target.value)}
                placeholder="Введіть опис"
                className={cn(
                  fieldClassName,
                  "desktop:min-h-40 ultra:min-h-48 min-h-32 w-full resize-none py-3",
                  errors.description && errorFieldClassName,
                )}
              />
            </CreateUserField>
          </div>
        </CardContent>
      </Card>

      <div className="desktop:mt-7 ultra:mt-8 mt-6 flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="border-text-error text-text-error hover:bg-text-error/10 hover:text-text-error desktop:h-11 desktop:min-w-44 ultra:h-12 ultra:min-w-52 ultra:text-[16px] h-10 min-w-36 rounded-3xl bg-transparent font-sans text-[14px] font-bold"
        >
          Скасувати
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="desktop:h-11 desktop:min-w-60 ultra:h-12 ultra:min-w-72 ultra:text-[16px] h-10 min-w-48 rounded-3xl font-sans text-[14px] font-bold"
        >
          {isSubmitting ? "Створення..." : "Додати користувача"}
        </Button>
      </div>
    </form>
  );
}

function CreateUserTextField({
  field,
  value,
  error,
  onChange,
}: {
  field: TextFieldConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const id = useId();

  return (
    <CreateUserField label={field.label} error={error}>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        aria-invalid={Boolean(error)}
        className={cn(fieldClassName, error && errorFieldClassName)}
      />
    </CreateUserField>
  );
}

function CreateUserField({ label, error, children }: CreateUserFieldProps) {
  return (
    <label className="block">
      <span className="text-text-heading ultra:text-[16px] mb-2 block font-sans text-[14px] leading-4 font-bold">
        {label}
      </span>

      {children}

      {error && (
        <span className="text-text-error ultra:text-[14px] mt-1.5 block font-sans text-[12px] leading-4">
          {error}
        </span>
      )}
    </label>
  );
}
