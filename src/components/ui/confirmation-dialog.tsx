"use client";

import { X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  message: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  isPending?: boolean;
  error?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
};

export function ConfirmationDialog({
  open,
  title,
  message,
  description,
  confirmLabel,
  cancelLabel = "Скасувати",
  isPending = false,
  error,
  onOpenChange,
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isPending) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <AlertDialogContent className="flex w-[calc(100vw-32px)] max-w-150 flex-col items-center gap-8.25 overflow-hidden rounded-3xl border-0 bg-background p-0 pb-3.75 shadow-[0_16px_46px_rgba(17,20,24,0.2),0_4px_8px_rgba(17,20,24,0.2),0_0_0_1px_rgba(17,20,24,0.1)]">
        <AlertDialogHeader className="flex h-16 w-full shrink-0 flex-row items-center justify-between border-b border-[#b8b8ba] px-5 py-4.75">
          <AlertDialogTitle className="font-sans text-[22px] leading-6.5 font-medium text-text-heading">
            {title}
          </AlertDialogTitle>

          <AlertDialogCancel
            size="icon"
            disabled={isPending}
            aria-label="Закрити"
            className="size-5 rounded-none border-0 bg-transparent p-0 text-text-muted hover:bg-transparent hover:text-text-heading"
          >
            <X aria-hidden="true" className="size-5" />
          </AlertDialogCancel>
        </AlertDialogHeader>

        <div className="flex w-[calc(100%-40px)] flex-col items-end gap-7.5">
          <div className="flex w-full flex-col items-start gap-3.75">
            <p className="w-full max-w-129.25 font-sans text-[18px] leading-5.25 font-medium text-text-heading">
              {message}
            </p>

            <AlertDialogDescription className="w-full max-w-129.25 font-sans text-[16px] leading-4.75 text-text-normal">
              {description}
            </AlertDialogDescription>

            {error && (
              <p className="w-full max-w-129.25 font-sans text-[14px] leading-4 text-text-error">
                {error}
              </p>
            )}
          </div>

          <AlertDialogFooter className="flex w-full max-w-90 flex-row items-start justify-end gap-3.75">
            <AlertDialogCancel
              disabled={isPending}
              className="h-9 w-42.75 rounded-2xl border-text-error bg-transparent px-3.5 py-2.5 font-sans text-[14px] leading-4 font-medium text-text-error hover:bg-text-error/10 hover:text-text-error"
            >
              {cancelLabel}
            </AlertDialogCancel>

            <AlertDialogAction
              type="button"
              disabled={isPending}
              onClick={() => void onConfirm()}
              className="h-9 w-43.5 rounded-2xl px-3.75 py-2.5 font-sans text-[14px] leading-4 font-medium"
            >
              {isPending ? "Зачекайте..." : confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
