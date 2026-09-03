"use client";

import { type FormEvent, useMemo, useRef, useState } from "react";
import type { ZodType } from "zod";

export type FormErrors<T extends object> = Partial<Record<keyof T | "form", string>>;
type UseFormStateOptions<T extends object> = {
  initialValues: T;
  schema: ZodType<T>;
  hasExternalChanges?: boolean;
};

export function useFormState<T extends object>({
  initialValues,
  schema,
  hasExternalChanges = false,
}: UseFormStateOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const handlerRef = useRef(false);
  const submitRef = useRef(false);

  const isDirty = useMemo(
    () => hasExternalChanges || JSON.stringify(values) !== JSON.stringify(initialValues),
    [hasExternalChanges, initialValues, values],
  );

  function setField<K extends keyof T>(name: K, value: T[K]) {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
      form: undefined,
    }));
  }

  async function runSubmit(onSubmit: () => Promise<void>) {
    if (submitRef.current) {
      return;
    }

    submitRef.current = true;
    setIsSubmitting(true);

    try {
      await onSubmit();
    } finally {
      submitRef.current = false;
      setIsSubmitting(false);
    }
  }

  function createValidationHandler(
    onValid: (values: T) => void | Promise<void>,
    getSubmitErrors: (error: unknown) => FormErrors<T>,
  ) {
    return async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if (handlerRef.current || submitRef.current) {
        return;
      }

      handlerRef.current = true;
      setIsValidating(true);

      try {
        const result = await schema.safeParseAsync(values);
        setIsValidating(false);

        if (!result.success) {
          const validationErrors = result.error.issues.reduce<FormErrors<T>>((errors, issue) => {
            const field = issue.path[0];

            if (typeof field === "string" && Object.keys(initialValues).includes(field)) {
              errors[field as keyof T] = issue.message;
            }

            return errors;
          }, {});
          setErrors(validationErrors);
          return;
        }
        setErrors({});

        await onValid(result.data);
      } catch (error) {
        setErrors(getSubmitErrors(error));
      } finally {
        handlerRef.current = false;
        setIsValidating(false);
      }
    };
  }

  function createSubmitHandler(
    onSubmit: (values: T) => Promise<void>,
    getSubmitErrors: (error: unknown) => FormErrors<T>,
  ) {
    return createValidationHandler(
      (validatedValues) => runSubmit(() => onSubmit(validatedValues)),
      getSubmitErrors,
    );
  }

  return {
    values,
    errors,
    isDirty,
    isValidating,
    isSubmitting,
    setField,
    runSubmit,
    createValidationHandler,
    createSubmitHandler,
  };
}
