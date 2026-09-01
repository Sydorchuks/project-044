import type { ReactNode } from "react";
import { AppQueryProvider } from "@/components/layout/app-query-provider";

type AppLayoutProps = Readonly<{ children: ReactNode }>;

export default function AppLayout({ children }: AppLayoutProps) {
  return <AppQueryProvider>{children}</AppQueryProvider>;
}
