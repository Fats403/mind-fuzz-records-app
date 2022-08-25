import React, { useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import Page from "../components/Page";
import { RegisterForm } from "../sections/authentication/register";
import Link from "next/link";
import AuthLayout from "../layouts/AuthLayout";
import { UserContext } from "../contexts/UserProvider";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    user && router.push("/");
  }, [user, router]);

  return (
    <AuthLayout>
      <Page title="Register">
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Register
        </Typography>

        <RegisterForm />

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
          }}
        >
          Already have an account?{" "}
          <Link variant="subtitle2" href="/login" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Page>
    </AuthLayout>
  );
}
