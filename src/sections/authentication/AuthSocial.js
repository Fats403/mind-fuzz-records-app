import { Button, Divider, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, googleAuthProvider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

export default function AuthSocial() {
  const router = useRouter();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(() => router.push("/"))
      .catch((e) => console.log("something went wrong.", e));
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
