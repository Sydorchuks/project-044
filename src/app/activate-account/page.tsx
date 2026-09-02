import { ActivateAccountForm } from "@/components/auth/activate-account-form";
import { AuthPageLayout } from "@/components/auth/auth-page-layout";

type ActivateAccountPageProps = Readonly<{
  searchParams: Promise<{ verify_token?: string | string[] }>;
}>;

export default async function ActivateAccountPage({ searchParams }: ActivateAccountPageProps) {
  const { verify_token: verifyTokenParam } = await searchParams;
  const verifyToken = typeof verifyTokenParam === "string" ? verifyTokenParam : undefined;

  return (
    <AuthPageLayout>
      <ActivateAccountForm verifyToken={verifyToken} />
    </AuthPageLayout>
  );
}
