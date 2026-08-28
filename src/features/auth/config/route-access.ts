type RoleAccessProfile = Readonly<{
  homeRoute: string;
}>;

const LOGIN_ROUTE = "/login";

const accessProfilesByScope = {
  admin: {
    homeRoute: "/admin",
  },
  b2b: {
    homeRoute: "/b2b/dashboard",
  },
} as const satisfies Record<string, RoleAccessProfile>;

type RouteScope = keyof typeof accessProfilesByScope;

const routeScopeByRole = {
  super_admin: "admin",
  superuser: "admin",
  user_full: "b2b",
} as const satisfies Record<string, RouteScope>;

type SupportedRole = keyof typeof routeScopeByRole;

function isSupportedRole(role: string): role is SupportedRole {
  return Object.hasOwn(routeScopeByRole, role);
}

function getRoleAccess(role?: string) {
  if (!role || !isSupportedRole(role)) {
    return null;
  }

  const scope = routeScopeByRole[role];

  return {
    scope,
    profile: accessProfilesByScope[scope],
  };
}

function matchesRouteScope(pathname: string, scope: RouteScope) {
  const scopeRoot = `/${scope}`;

  return pathname === scopeRoot || pathname.startsWith(`${scopeRoot}/`);
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

  return matchesRouteScope(pathname, access.scope) ? null : access.profile.homeRoute;
}

export function getPostLoginRoute(role: string | undefined, requestedRoute?: string | null) {
  const access = getRoleAccess(role);

  if (!access) {
    return LOGIN_ROUTE;
  }

  if (requestedRoute) {
    const pathname = getInternalPathname(requestedRoute);

    if (pathname && matchesRouteScope(pathname, access.scope)) {
      return requestedRoute;
    }
  }

  return access.profile.homeRoute;
}
