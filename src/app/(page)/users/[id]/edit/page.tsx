import { EditUserPage } from "@/components/users/edit-user-page";

type EditUserRoutePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUserRoutePage({ params }: EditUserRoutePageProps) {
  const { id } = await params;

  return <EditUserPage userId={Number(id)} />;
}
