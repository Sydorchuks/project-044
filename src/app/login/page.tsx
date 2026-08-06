import Image from "next/image";

import { LoginForm } from "@/components/auth/login-form";
import { CompanyMark } from "@/components/layout/company-mark";

export default function LoginPage() {
  return (
    <main className="bg-background grid min-h-dvh lg:grid-cols-[50%_50%]">
      <section className="bg-background relative flex min-h-dvh items-center justify-center px-6 py-12">
        <div className="[--login-scale:1] min-[1536px]:[--login-scale:1.15] min-[1920px]:[--login-scale:1.35] min-[2560px]:[--login-scale:1.6]">
          <div className="relative h-[calc(620px*var(--login-scale))] w-[calc(388px*var(--login-scale))]">
            <div className="absolute top-1/2 left-0 w-97 origin-left -translate-y-1/2 scale-(--login-scale)">
              <LoginForm />
            </div>

            <p className="absolute bottom-0 left-0 font-sans text-[14px] leading-4 text-[#ABB3BF]">
              © 2023 FicusTechnologies
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

        <div className="absolute inset-0 flex items-center justify-center pt-9">
          <CompanyMark
            prefix="PROJECT"
            accent="NAME"
            prefixColor="#FFFFFF"
            className="-translate-x-8 gap-2 text-[32px] min-[1536px]:-translate-x-16 min-[1536px]:text-[38px] min-[1920px]:text-[46px] min-[2560px]:text-[58px]"
          />
        </div>
      </section>
    </main>
  );
}
