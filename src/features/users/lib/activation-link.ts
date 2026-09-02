const ACTIVATION_URL_STORAGE_KEY = "b2bActivationUrl";

export function saveActivationUrl(activationUrl: string) {
  sessionStorage.setItem(ACTIVATION_URL_STORAGE_KEY, activationUrl);
}

export function logSavedActivationUrl() {
  const activationUrl = sessionStorage.getItem(ACTIVATION_URL_STORAGE_KEY);

  if (!activationUrl) {
    return;
  }

  console.log("B2B activation URL:", activationUrl);
  sessionStorage.removeItem(ACTIVATION_URL_STORAGE_KEY);
}
