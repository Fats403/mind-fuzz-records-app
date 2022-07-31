import { useContext, useState } from "react";
import { Stack, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ControlledMuiTextfield from "../../../components/inputs/ControlledMuiTextfield";
import { auth } from "../../../utils/firebase";
import { useRouter } from "next/router";
import { SnackBarContext } from "../../../contexts/SnackBarProvider";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showMessage } = useContext(SnackBarContext);

  const form = useForm();
  const {
    formState: { errors },
    handleSubmit,
    watch,
    control,
    clearErrors,
  } = form;
  const { email, password } = watch();

  const register = async () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);
        showMessage({
          message: "Welcome to Mind Fuzz!",
          severity: "success",
        });
        router.push("/");
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

        <ControlledMuiTextfield
          disabled={isLoading}
          fullWidth={true}
          required={true}
          type={showPassword ? "text" : "password"}
          rules={{
            required: {
              value: true,
              message: `This field is required.`,
            },
          }}
          error={errors.password}
          control={control}
          name="password"
          label={`Password`}
          onKeyPress={(e) =>
            e.key === "Enter" && password.length && handleSubmit(register)()
          }
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onFocus={() => clearErrors("password")}
        />
        <ControlledMuiTextfield
          disabled={isLoading}
          fullWidth={true}
          required={true}
          type={showVerifyPassword ? "text" : "password"}
          rules={{
            required: {
              value: true,
              message: `This field is required.`,
            },
            validate: (value) => password === value || `Passwords do not match`,
          }}
          error={errors.verifyPassword}
          control={control}
          name="verifyPassword"
          label={`Verify Password`}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showVerifyPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onFocus={() => clearErrors("verifyPassword")}
        />
        <LoadingButton
          onClick={() => handleSubmit(register)()}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Register
        </LoadingButton>
      </Stack>
    </>
  );
}
