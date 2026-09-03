"use client";

import type { FormEvent } from "react";

import { OrganizationImageUpload } from "@/components/organizations/organization-image-upload";
import { OrganizationWorkingHours } from "@/components/organizations/organization-working-hours";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Input } from "@/components/ui/input";
import { useOrganizationForm } from "@/features/organizations/hooks/use-organization-form";
import { ORGANIZATION_DIALOGS } from "@/features/organizations/config/organization-form.config";
import type { Organization } from "@/features/organizations/schemas/organization.schema";
import { cn } from "@/lib/utils";

type OrganizationFormProps = Readonly<
  { mode: "create"; organization?: never } | { mode: "edit"; organization: Organization }
>;

const FORM_SECTION_CLASS_NAME =
  "w-full rounded-2xl border border-border bg-background p-6 shadow-organization-form";
const FORM_FIELD_CLASS_NAME =
  "h-10 rounded-2xl border-border bg-form-control px-3 py-2.5 text-[12px] leading-4 placeholder:text-field-placeholder";

export function OrganizationForm({ mode, organization }: OrganizationFormProps) {
  const {
    values,
    errors,
    image,
    imageError,
    isSubmitting,
    isProcessing,
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
  } = useOrganizationForm({ organization });

  function submitForm(event: FormEvent<HTMLFormElement>) {
    if (imageError || isProcessing) {
      event.preventDefault();
      return;
    }

    void handleSubmit(event);
  }

  return (
    <>
      <form onSubmit={submitForm} className="flex w-full max-w-[650px] flex-col items-end gap-6">
        <fieldset disabled={isProcessing} className={FORM_SECTION_CLASS_NAME}>
          <SectionTitle>Загальна інформація</SectionTitle>

          <div className="mt-3.5 flex flex-col gap-3.5">
            <FormField label="Назва організації" error={errors.name}>
              <Input
                value={values.name}
                aria-invalid={Boolean(errors.name)}
                placeholder="Введіть тут назву організації..."
                onChange={(event) => setField("name", event.target.value)}
                className={FORM_FIELD_CLASS_NAME}
              />
            </FormField>

            <FormField label="Опис" error={errors.description}>
              <textarea
                value={values.description}
                aria-invalid={Boolean(errors.description)}
                placeholder="Введіть тут опис організації..."
                onChange={(event) => setField("description", event.target.value)}
                className={cn(FORM_FIELD_CLASS_NAME, "h-25.25 resize-none")}
              />
            </FormField>
          </div>
        </fieldset>

        <fieldset disabled={isProcessing} className={FORM_SECTION_CLASS_NAME}>
          <SectionTitle>Інформація</SectionTitle>

          <div className="mt-3.5 flex flex-col gap-3.5">
            <FormField label="Телефон" error={errors.phone}>
              <Input
                type="tel"
                value={values.phone}
                aria-invalid={Boolean(errors.phone)}
                placeholder="+380..."
                onChange={(event) => setField("phone", event.target.value)}
                className={FORM_FIELD_CLASS_NAME}
              />
            </FormField>

            <FormField label="Місцезнаходження" error={errors.address}>
              <Input
                value={values.address}
                aria-invalid={Boolean(errors.address)}
                placeholder="Розташування організації"
                onChange={(event) => setField("address", event.target.value)}
                className={FORM_FIELD_CLASS_NAME}
              />
            </FormField>
          </div>
        </fieldset>

        <fieldset disabled={isProcessing} className={FORM_SECTION_CLASS_NAME}>
          <SectionTitle className="text-[18px] leading-7">Зображення організації</SectionTitle>

          <div className="mt-3.5">
            <OrganizationImageUpload
              currentPhoto={isImageRemoved ? null : organization?.photo}
              file={image}
              error={imageError}
              disabled={isProcessing}
              onChange={handleImageChange}
              onDelete={
                organization?.photo && !isImageRemoved ? handleImageDeleteRequest : undefined
              }
              onRestore={isImageRemoved ? handleImageRestore : undefined}
            />
          </div>
        </fieldset>

        <fieldset disabled={isProcessing} className={FORM_SECTION_CLASS_NAME}>
          <SectionTitle>Години роботи</SectionTitle>

          <div className="mt-3.5">
            <OrganizationWorkingHours
              isOpenAllDay={values.isOpenAllDay}
              workingHours={values.workingHours}
              error={errors.workingHours}
              onAllDayChange={(checked) => setField("isOpenAllDay", checked)}
              onDayChange={(day, value) =>
                setField("workingHours", { ...values.workingHours, [day]: value })
              }
            />
          </div>
        </fieldset>

        {errors.form ? (
          <p role="alert" className="w-full text-right text-[14px] leading-5 text-text-error">
            {errors.form}
          </p>
        ) : null}

        <div
          className={cn(
            "grid w-full max-w-90 grid-cols-2 gap-3.75",
            mode === "edit" && "max-w-[570px] grid-cols-3 gap-2 sm:gap-3.75",
          )}
        >
          {mode === "edit" ? (
            <Button
              type="button"
              variant="outline"
              disabled={isProcessing}
              onClick={handleDeleteRequest}
              className="h-9 rounded-2xl border-text-muted bg-transparent text-[14px] leading-4 text-text-muted hover:bg-destructive/10 hover:text-destructive"
            >
              Видалити
            </Button>
          ) : null}
          <Button
            type="button"
            variant="outline"
            disabled={isProcessing}
            onClick={handleCancel}
            className="h-9 rounded-2xl border-destructive bg-transparent text-[14px] leading-4 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Скасувати
          </Button>

          <Button
            type="submit"
            disabled={isProcessing}
            className="h-9 rounded-2xl px-3 text-[14px] leading-4"
          >
            {isSubmitting ? "Збереження..." : mode === "create" ? "Додати організацію" : "Зберегти"}
          </Button>
        </div>
      </form>
      {dialog ? (
        <ConfirmationDialog
          {...ORGANIZATION_DIALOGS[dialog.type]}
          open
          title="Підтвердження"
          isPending={isProcessing}
          error={dialogError}
          onOpenChange={handleDialogOpenChange}
          onConfirm={handleConfirm}
        />
      ) : null}
    </>
  );
}

type FormFieldProps = Readonly<{
  label: string;
  error?: string;
  children: React.ReactNode;
}>;

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-[12px] leading-4 font-medium text-text-normal">
      {label}
      {children}
      {error ? <span className="font-normal text-text-error">{error}</span> : null}
    </label>
  );
}

type SectionTitleProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={cn("text-[18px] leading-[21px] font-medium text-primary", className)}>
      {children}
    </h2>
  );
}
