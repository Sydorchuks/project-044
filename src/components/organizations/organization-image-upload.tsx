"use client";

import { ImageIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OrganizationImageUploadProps = Readonly<{
  currentPhoto?: string | null;
  file: File | null;
  error?: string;
  disabled?: boolean;
  onChange: (file: File | null) => void;
  onDelete?: () => void;
  onRestore?: () => void;
}>;

export function OrganizationImageUpload({
  currentPhoto,
  file,
  error,
  disabled = false,
  onChange,
  onDelete,
  onRestore,
}: OrganizationImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const hasPreview = Boolean(file || currentPhoto);

  useEffect(() => {
    const preview = previewRef.current;

    if (!preview) {
      return;
    }

    const previewUrl = file ? URL.createObjectURL(file) : currentPhoto;

    preview.style.backgroundImage = previewUrl ? `url(${JSON.stringify(previewUrl)})` : "";

    return () => {
      if (file && previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [file, currentPhoto]);

  function selectFile(selectedFile?: File) {
    if (disabled || !selectedFile) {
      return;
    }

    onChange(selectedFile);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function clearSelection() {
    if (disabled) {
      return;
    }

    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div>
      <div
        ref={previewRef}
        aria-disabled={disabled}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          selectFile(event.dataTransfer.files[0]);
        }}
        className={cn(
          "relative grid h-45 place-items-center overflow-hidden rounded-2xl border border-dashed border-brand-soft bg-form-control bg-cover bg-center px-6",
          error && "border-text-error",
        )}
      >
        {hasPreview ? <div className="absolute inset-0 bg-foreground/35" /> : null}

        <div className="relative z-10 flex flex-col items-center gap-3.5">
          <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
            <ImageIcon aria-hidden="true" className="size-6" />
          </span>

          <p
            className={cn(
              "text-center text-[12px] leading-4 text-text-muted",
              hasPreview && "text-white",
            )}
          >
            Перетягніть зображення сюди або натисніть «Додати зображення»
          </p>

          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="h-10 min-w-42.75 rounded-2xl border-primary bg-background px-4 text-[14px] leading-4 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {hasPreview ? "Замінити зображення" : "Додати зображення"}
          </Button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        aria-label="Зображення організації"
        disabled={disabled}
        accept="image/jpeg,image/png"
        className="sr-only"
        onChange={(event) => selectFile(event.target.files?.[0])}
      />

      {error ? (
        <p role="alert" className="mt-1 text-[12px] leading-4 text-text-error">
          {error}
        </p>
      ) : null}

      {file || error ? (
        <Button
          type="button"
          variant="ghost"
          disabled={disabled}
          onClick={clearSelection}
          className="mt-2 text-[12px] text-primary"
        >
          Скасувати вибір
        </Button>
      ) : null}

      {currentPhoto && !file && onDelete ? (
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={onDelete}
          className="mt-3 h-10 w-full rounded-2xl bg-form-control text-[12px]"
        >
          Видалити зображення
        </Button>
      ) : null}

      {onRestore && !file ? (
        <div className="mt-2 text-[12px] leading-4 text-text-muted">
          <p>Зображення буде видалено після збереження.</p>
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            onClick={onRestore}
            className="mt-1 text-[12px] text-primary"
          >
            Скасувати видалення
          </Button>
        </div>
      ) : null}
    </div>
  );
}
