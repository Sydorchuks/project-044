const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

type SaveAuthTokensParams = {
  accessToken: string;
  refreshToken: string;
  rememberMe: boolean;
};

export function saveAuthTokens({ accessToken, refreshToken, rememberMe }: SaveAuthTokensParams) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

  if (rememberMe) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

export function getAccessToken() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearAuthTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
