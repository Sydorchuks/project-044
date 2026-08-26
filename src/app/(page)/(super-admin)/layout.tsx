import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";

type SuperAdminLayoutProps = Readonly<{ children: ReactNode }>;

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  return <AppShell variant="super-admin">{children}</AppShell>;
}
