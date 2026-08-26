import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";

type B2BLayoutProps = Readonly<{ children: ReactNode }>;

export default function B2BLayout({ children }: B2BLayoutProps) {
  return <AppShell variant="b2b">{children}</AppShell>;
}
