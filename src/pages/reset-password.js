import { Typography } from "@mui/material";
import Page from "../components/Page";
import { ResetPasswordForm } from "../sections/authentication/reset-password";
import AuthLayout from "../layouts/AuthLayout";

export default function ResetPassword() {
  return (
    <AuthLayout>
      <Page title="Reset Password">
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Reset Password
        </Typography>

        <ResetPasswordForm />
      </Page>
    </AuthLayout>
  );
}
