"use client";

import { type FormEvent, useMemo, useState } from "react";
import type { ZodType } from "zod";

export type FormErrors<T extends object> = Partial<Record<keyof T | "form", string>>;
type UseFormStateOptions<T extends object> = {
  initialValues: T;
  schema: ZodType<T>;
};

export function useFormState<T extends object>({ initialValues, schema }: UseFormStateOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDirty = useMemo(
    () =>
      Object.keys(initialValues).some((field) => {
        const name = field as keyof T;

        return values[name] !== initialValues[name];
      }),
    [initialValues, values],
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

  function createSubmitHandler(
    onSubmit: (values: T) => Promise<void>,
    getSubmitErrors: (error: unknown) => FormErrors<T>,
  ) {
    return async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const result = schema.safeParse(values);

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
      setIsSubmitting(true);
      setErrors({});

      try {
        await onSubmit(result.data);
      } catch (error) {
        setErrors(getSubmitErrors(error));
      } finally {
        setIsSubmitting(false);
      }
    };
  }

  return { values, errors, isDirty, isSubmitting, setField, createSubmitHandler };
}
