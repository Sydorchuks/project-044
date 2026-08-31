export function getScopedPath(scope: string, path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `/${scope}${normalizedPath}`;
}
