import { useContext, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import ControlledMuiTextfield from "../../../components/inputs/ControlledMuiTextfield";
import router from "next/router";
import { SnackBarContext } from "../../../contexts/SnackBarProvider";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "../../../components/Link";
import { auth } from "../../../services/firebase/client";

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useContext(SnackBarContext);

  const form = useForm();
  const {
    formState: { errors },
    handleSubmit,
    watch,
    control,
    clearErrors,
  } = form;

  const { email } = watch();

  const resetPassword = async () => {
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        showMessage({
          message: `Password reset email sent to ${email}`,
          severity: "success",
        });
        router.push("/login");
      })
      .catch((e) => {
        setIsLoading(false);
        showMessage({
          message: e.message,
          severity: "error",
        });
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <ControlledMuiTextfield
          autoFocus
          disabled={isLoading}
          fullWidth={true}
          required={true}
          type="email"
          rules={{
            required: {
              value: true,
              message: `This field is required.`,
            },
          }}
          error={errors.email}
          control={control}
          name="email"
          label={`Email`}
          InputLabelProps={{ shrink: true }}
          onFocus={() => clearErrors("email")}
        />
        <LoadingButton
          onClick={() => handleSubmit(resetPassword)()}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Send Reset Email
        </LoadingButton>
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
          }}
        >
          <Link variant="subtitle2" href="/login" underline="hover">
            Back to login
          </Link>
        </Typography>
      </Stack>
    </>
  );
}
