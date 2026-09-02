import { AuthPageLayout } from "@/components/auth/auth-page-layout";
import { LoginForm } from "@/components/auth/login-form";

type LoginPageProps = Readonly<{
  searchParams: Promise<{
    activated?: string;
  }>;
}>;

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { activated } = await searchParams;

  return (
    <AuthPageLayout>
      <LoginForm isAccountActivated={activated === "true"} />
    </AuthPageLayout>
  );
}
