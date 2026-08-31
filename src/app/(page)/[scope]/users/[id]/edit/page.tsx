import { EditUserPage } from "@/components/users/edit-user-page";

type EditUserRoutePageProps = Readonly<{
  params: Promise<{
    scope: string;
    id: string;
  }>;
}>;

export default async function EditUserRoutePage({ params }: EditUserRoutePageProps) {
  const { scope, id } = await params;

  return <EditUserPage scope={scope} userId={Number(id)} />;
}
