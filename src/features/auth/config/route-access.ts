type RoleAccessProfile = Readonly<{
  homeRoute: string;
  allowedRoutes: readonly string[];
}>;

const LOGIN_ROUTE = "/login";

const superAdminAccessProfile = {
  homeRoute: "/",
  allowedRoutes: ["/", "/users", "/requests"],
} as const satisfies RoleAccessProfile;

const roleAccessProfiles = {
  super_admin: superAdminAccessProfile,
  superuser: superAdminAccessProfile,
  user_full: {
    homeRoute: "/b2b/dashboard",
    allowedRoutes: ["/b2b"],
  },
} as const satisfies Record<string, RoleAccessProfile>;

type SupportedRole = keyof typeof roleAccessProfiles;

function isSupportedRole(role: string): role is SupportedRole {
  return Object.hasOwn(roleAccessProfiles, role);
}

function matchesRoute(pathname: string, allowedRoute: string) {
  return (
    pathname === allowedRoute || (allowedRoute !== "/" && pathname.startsWith(`${allowedRoute}/`))
  );
}

function getAccessProfile(role?: string) {
  if (!role || !isSupportedRole(role)) {
    return null;
  }

  return roleAccessProfiles[role];
}

function isRouteAllowed(profile: RoleAccessProfile, pathname: string) {
  return profile.allowedRoutes.some((allowedRoute) => matchesRoute(pathname, allowedRoute));
}

function getInternalPathname(route: string) {
  if (!route.startsWith("/") || route.startsWith("//")) {
    return null;
  }

  try {
    const baseUrl = new URL("http://localhost");
    const routeUrl = new URL(route, baseUrl);

    if (routeUrl.origin !== baseUrl.origin) {
      return null;
    }

    return routeUrl.pathname;
  } catch {
    return null;
  }
}

export function getUnauthorizedRoute(role: string | undefined, pathname: string) {
  const profile = getAccessProfile(role);

  if (!profile) {
    return LOGIN_ROUTE;
  }

  return isRouteAllowed(profile, pathname) ? null : profile.homeRoute;
}

export function getPostLoginRoute(role: string | undefined, requestedRoute?: string | null) {
  const profile = getAccessProfile(role);

  if (!profile) {
    return LOGIN_ROUTE;
  }

  if (requestedRoute) {
    const pathname = getInternalPathname(requestedRoute);

    if (pathname && isRouteAllowed(profile, pathname)) {
      return requestedRoute;
    }
  }

  return profile.homeRoute;
}
