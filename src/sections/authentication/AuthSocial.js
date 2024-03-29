import { Button, Divider, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { SnackBarContext } from "../../contexts/SnackBarProvider";
import { useContext } from "react";
import { auth, googleAuthProvider } from "../../services/firebase/client";

export default function AuthSocial() {
  const { showMessage } = useContext(SnackBarContext);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider).catch(() =>
      showMessage({
        message: "Something went wrong, try again later.",
        severity: "error",
      })
    );
  };

  return (
    <>
      <Button
        onClick={signInWithGoogle}
        sx={{
          textTransform: "none",
          backgroundColor: "#DF3E30",
          borderColor: "#DF3E30",
          color: "#FFF",
          "&:hover": {
            backgroundColor: "#DF3E30DD",
            borderColor: "#DF3E30",
          },
        }}
        fullWidth
        size="large"
        variant="outlined"
      >
        Login with Google <GoogleIcon sx={{ ml: 1 }} fontSize="small" />
      </Button>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
