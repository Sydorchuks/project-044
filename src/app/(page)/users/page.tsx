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
    <section className="bg-main-bg desktop:pr-10 ultra:pr-14 min-h-full px-5 pt-4 pb-8 xl:px-0 xl:pt-0 xl:pr-7">
      <h1 className="text-text-heading desktop:text-[28px] desktop:leading-9 font-sans text-[24px] leading-8 font-bold">
        Користувачі
      </h1>
    </section>
  );
}
