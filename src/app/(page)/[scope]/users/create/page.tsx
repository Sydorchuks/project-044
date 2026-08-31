import { CreateUserPage } from "@/components/users/create-user-page";

type CreateUserRoutePageProps = Readonly<{
  params: Promise<{
    scope: string;
  }>;
}>;

export default async function CreateUserRoutePage({ params }: CreateUserRoutePageProps) {
  const { scope } = await params;

  return <CreateUserPage scope={scope} />;
}
