import { useContext, useState } from "react";
import {
  Link,
  Stack,
  Checkbox,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ControlledMuiTextfield from "../../../components/inputs/ControlledMuiTextfield";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SnackBarContext } from "../../../contexts/SnackBarProvider";
import { auth } from "../../../services/firebase/client";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(true);
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
  const { email, password } = watch();

  const login = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password).catch(() => {
      setIsLoading(false);
      showMessage({
        message: "Email or password is incorrect.",
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
            e.key === "Enter" && password.length && handleSubmit(login)()
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
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <FormControlLabel
          control={
            <Checkbox
              onClick={() => {
                setPersistence(
                  auth,
                  staySignedIn
                    ? browserSessionPersistence
                    : browserLocalPersistence
                );
                setStaySignedIn(!staySignedIn);
              }}
              checked={staySignedIn}
            />
          }
          label="Stay signed in"
        />

        <Link variant="subtitle2" href="/reset-password" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        onClick={() => handleSubmit(login)()}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
      >
        Login
      </LoadingButton>
    </>
  );
}
