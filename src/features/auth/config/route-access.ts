import type { AppShellVariant } from "@/config/navigation/navigation.types";

type RouteScopeConfig = Readonly<{
  homeRoute: string;
  allowedSections: readonly string[];
  shellVariant: AppShellVariant;
}>;

const LOGIN_ROUTE = "/login";

export const routeConfigByScope = {
  admin: {
    homeRoute: "/admin/dashboard",
    allowedSections: ["dashboard", "users", "requests"],
    shellVariant: "super-admin",
  },
  b2b: {
    homeRoute: "/b2b/dashboard",
    allowedSections: [
      "dashboard",
      "schedule",
      "reservations",
      "clients",
      "organizations",
      "products",
      "staff",
      "statistics",
    ],
    shellVariant: "b2b",
  },
} as const satisfies Record<string, RouteScopeConfig>;

export type RouteScope = keyof typeof routeConfigByScope;

const routeScopeByRole = {
  super_admin: "admin",
  superuser: "admin",
  user_full: "b2b",
} as const satisfies Record<string, RouteScope>;

type SupportedRole = keyof typeof routeScopeByRole;

function isSupportedRole(role: string): role is SupportedRole {
  return Object.hasOwn(routeScopeByRole, role);
}

export function isRouteScope(scope: string): scope is RouteScope {
  return Object.hasOwn(routeConfigByScope, scope);
}

export function getRouteScopeConfig(scope: RouteScope) {
  return routeConfigByScope[scope];
}

function getRoleAccess(role?: string) {
  if (!role || !isSupportedRole(role)) {
    return null;
  }

  const scope = routeScopeByRole[role];

  return {
    scope,
    profile: routeConfigByScope[scope],
  };
}

function getRouteParts(pathname: string) {
  const [scope, section] = pathname.split("/").filter(Boolean);

  return { scope, section };
}

function isRouteAllowed(pathname: string, scope: RouteScope, profile: RouteScopeConfig) {
  const route = getRouteParts(pathname);

  if (route.scope !== scope) {
    return false;
  }

  return !route.section || profile.allowedSections.includes(route.section);
}

function getInternalPathname(route: string) {
  if (!route.startsWith("/") || route.startsWith("//")) {
    return null;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!appUrl) {
    return null;
  }

  try {
    const appOrigin = new URL(appUrl).origin;
    const routeUrl = new URL(route, appOrigin);

    if (routeUrl.origin !== appOrigin) {
      return null;
    }

    return routeUrl.pathname;
  } catch {
    return null;
  }
}

export function getUnauthorizedRoute(role: string | undefined, pathname: string) {
  const access = getRoleAccess(role);

  if (!access) {
    return LOGIN_ROUTE;
  }

  return isRouteAllowed(pathname, access.scope, access.profile) ? null : access.profile.homeRoute;
}

export function getPostLoginRoute(role: string | undefined, requestedRoute?: string | null) {
  const access = getRoleAccess(role);

  if (!access) {
    return LOGIN_ROUTE;
  }

  if (requestedRoute) {
    const pathname = getInternalPathname(requestedRoute);

    if (pathname && isRouteAllowed(pathname, access.scope, access.profile)) {
      return requestedRoute;
    }
  }

  return access.profile.homeRoute;
}
