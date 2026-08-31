import { notFound, redirect } from "next/navigation";

import { getRouteScopeConfig, isRouteScope } from "@/features/auth/config/route-access";

type ScopeHomePageProps = Readonly<{
  params: Promise<{
    scope: string;
  }>;
}>;

export default async function ScopeHomePage({ params }: ScopeHomePageProps) {
  const { scope } = await params;

  if (!isRouteScope(scope)) {
    notFound();
  }

  redirect(getRouteScopeConfig(scope).homeRoute);
}
