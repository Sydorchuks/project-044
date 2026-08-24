import Image from "next/image";

import { LoginForm } from "@/components/auth/login-form";
import { CompanyMark } from "@/components/layout/company-mark";

export default function LoginPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="grid min-h-dvh bg-background lg:grid-cols-[50%_50%]">
      <section className="relative flex min-h-dvh items-center justify-center bg-background px-6 py-12">
        <div className="[--login-scale:1] 2xl:[--login-scale:1.15] desktop:[--login-scale:1.35] ultra:[--login-scale:1.6]">
          <div className="relative h-[calc(620px*var(--login-scale))] w-[calc(388px*var(--login-scale))]">
            <div className="absolute top-1/2 left-0 w-97 origin-left -translate-y-1/2 scale-(--login-scale)">
              <LoginForm />
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
