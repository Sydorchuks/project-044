import { isAxiosError } from "axios";

export function isMissingResourceError(error: unknown) {
  return isAxiosError(error) && [404, 409].includes(error.response?.status ?? 0);
}

export function isForbiddenError(error: unknown) {
  return isAxiosError(error) && error.response?.status === 403;
}
