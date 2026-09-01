import type { AppShellVariant } from "@/config/navigation/navigation.types";

export const UserRole = {
  SUPER_ADMIN: "super_admin",
  SUPERUSER: "superuser",
  USER_FULL: "user_full",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const ADMIN_ROLES = [UserRole.SUPER_ADMIN, UserRole.SUPERUSER] as const;
export const B2B_ROLES = [UserRole.USER_FULL] as const;
export const AUTHENTICATED_ROLES = [...ADMIN_ROLES, ...B2B_ROLES] as const;

const LOGIN_ROUTE = "/login";
const DASHBOARD_ROUTE = "/dashboard";

const dashboardVariantByRole = {
  [UserRole.SUPER_ADMIN]: "super-admin",
  [UserRole.SUPERUSER]: "super-admin",
  [UserRole.USER_FULL]: "b2b",
} as const satisfies Record<UserRole, AppShellVariant>;

const routeAccessRules = [
  { route: "/", roles: AUTHENTICATED_ROLES },
  { route: DASHBOARD_ROUTE, roles: AUTHENTICATED_ROLES },
  { route: "/users", roles: ADMIN_ROLES },
  { route: "/requests", roles: ADMIN_ROLES },
  { route: "/schedule", roles: B2B_ROLES },
  { route: "/reservations", roles: B2B_ROLES },
  { route: "/clients", roles: B2B_ROLES },
  { route: "/organizations", roles: B2B_ROLES },
  { route: "/products", roles: B2B_ROLES },
  { route: "/staff", roles: B2B_ROLES },
  { route: "/statistics", roles: B2B_ROLES },
] as const;

function isUserRole(role: string): role is UserRole {
  return Object.hasOwn(dashboardVariantByRole, role);
}

function matchesRoute(pathname: string, route: string) {
  return pathname === route || (route !== "/" && pathname.startsWith(`${route}/`));
}

function isRouteAllowed(role: UserRole, pathname: string) {
  const rule = routeAccessRules.find(({ route }) => matchesRoute(pathname, route));

  return rule?.roles.some((allowedRole) => allowedRole === role) ?? false;
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

export function getDashboardVariant(role?: string) {
  return role && isUserRole(role) ? dashboardVariantByRole[role] : null;
}

export function getUnauthorizedRoute(
  role: string | undefined,
  allowedRoles: readonly UserRole[],
  redirectTo: string,
) {
  if (!role || !isUserRole(role)) {
    return LOGIN_ROUTE;
  }

  return allowedRoles.includes(role) ? null : redirectTo;
}

export function getPostLoginRoute(role: string | undefined, requestedRoute?: string | null) {
  if (!role || !isUserRole(role)) {
    return LOGIN_ROUTE;
  }

  if (requestedRoute) {
    const pathname = getInternalPathname(requestedRoute);

    if (pathname && isRouteAllowed(role, pathname)) {
      return requestedRoute;
    }
  }

  return DASHBOARD_ROUTE;
}
