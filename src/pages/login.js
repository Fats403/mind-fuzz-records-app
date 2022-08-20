import { Typography } from "@mui/material";
import Page from "../components/Page";
import Link from "../components/Link";
import { LoginForm } from "../sections/authentication/login";
import AuthSocial from "../sections/authentication/AuthSocial";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserProvider";
import AuthLayout from "../layouts/AuthLayout";

export default function Login() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    user && router.push("/");
  }, [user, router]);

  return (
    <AuthLayout>
      <Page title="Login">
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Mind Fuzz Records
        </Typography>

        <AuthSocial />

        <LoginForm />

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
          }}
        >
          Don't have an account?{" "}
          <Link variant="subtitle2" href="/register" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Page>
    </AuthLayout>
  );
}
