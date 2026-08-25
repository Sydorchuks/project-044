import { Suspense } from "react";

import { UsersPage } from "@/components/users/users-page";

export default function UsersRoutePage() {
  return (
    <Suspense fallback={<UsersPageFallback />}>
      <UsersPage />
    </Suspense>
  );
}

function UsersPageFallback() {
  return (
    <section className="min-h-full bg-main-bg px-5 pt-4 pb-8 xl:px-0 xl:pt-0 xl:pr-7 desktop:pr-10 ultra:pr-14">
      <h1 className="font-sans text-[24px] leading-8 font-bold text-text-heading desktop:text-[28px] desktop:leading-9">
        Користувачі
      </h1>
    </section>
  );
}
