import Image from "next/image";
import type { ReactNode } from "react";

import { CompanyMark } from "@/components/layout/company-mark";

type AuthPageLayoutProps = Readonly<{
  children: ReactNode;
}>;

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
  const currentYear = new Date().getFullYear();

  return (
    <main className="grid min-h-dvh bg-background lg:grid-cols-[50%_50%]">
      <section className="relative flex min-h-dvh items-center justify-center bg-background px-6 py-12">
        <div className="[--auth-scale:1] 2xl:[--auth-scale:1.15] desktop:[--auth-scale:1.35] ultra:[--auth-scale:1.6]">
          <div className="relative h-[calc(620px*var(--auth-scale))] w-[calc(388px*var(--auth-scale))]">
            <div className="absolute top-1/2 left-0 w-97 origin-left -translate-y-1/2 scale-(--auth-scale)">
              {children}
            </div>

            <p className="absolute bottom-0 left-0 font-sans text-[14px] leading-4 text-text-subtle">
              © {currentYear} FicusTechnologies
            </p>
          </div>
        </div>
      </section>

      <section className="relative hidden h-dvh w-full overflow-hidden bg-black lg:block">
        <Image
          src="/images/login-bg.png"
          alt=""
          width={960}
          height={930}
          priority
          className="h-full w-full object-fill"
        />

        <div className="absolute inset-0">
          <CompanyMark
            prefix="PROJECT"
            accent="NAME"
            prefixColor="var(--primary-foreground)"
            className="absolute top-1/2 left-[20%] gap-2 text-[32px] xl:left-[30%] 2xl:text-[38px] desktop:text-[46px] ultra:text-[58px]"
          />
        </div>
      </section>
    </main>
  );
}
