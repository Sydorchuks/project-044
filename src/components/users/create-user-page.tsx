import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { CreateUserForm } from "./create-user-form";

const breadcrumbs: BreadcrumbItem[] = [
  {
    label: "Користувачі",
    href: "/users",
  },
  {
    label: "Додати користувача",
  },
];

export function CreateUserPage() {
  return (
    <section className="h-full min-h-0 overflow-hidden bg-main-bg px-5 pt-4 pb-8 xl:px-0 xl:pt-0 xl:pr-7 desktop:pr-10 ultra:pr-14">
      <div className="grid h-full min-h-0 w-full grid-cols-[250px_minmax(420px,460px)_1fr] grid-rows-[auto_1fr] gap-x-6 pt-12 xl:grid-cols-[300px_minmax(440px,500px)_1fr] xl:gap-x-8 xl:pt-10 desktop:grid-cols-[390px_minmax(620px,640px)_1fr] desktop:gap-x-12 desktop:pt-14 ultra:grid-cols-[560px_minmax(700px,720px)_1fr] ultra:gap-x-16 ultra:pt-20">
        <div className="col-start-1 row-start-1 xl:-translate-y-3 desktop:translate-y-0">
          <h1 className="max-w-60 font-sans text-[22px] leading-7 font-bold text-text-heading xl:max-w-none xl:text-[24px] xl:leading-8 desktop:text-[24px] desktop:leading-8 ultra:text-[32px] ultra:leading-10">
            Додати користувача
          </h1>

          <Breadcrumbs items={breadcrumbs} className="mt-3 ultra:text-[16px] ultra:leading-5" />
        </div>

        <div className="col-start-2 row-start-2 flex min-h-0 items-start pt-10 xl:pt-8 desktop:col-start-2 desktop:row-start-1 desktop:row-end-3 desktop:items-center desktop:pt-0">
          <CreateUserForm />
        </div>
      </div>
    </section>
  );
}
