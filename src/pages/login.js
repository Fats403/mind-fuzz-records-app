import { styled, useTheme } from "@mui/material/styles";
import {
  Stack,
  Container,
  Typography,
  Paper,
  useMediaQuery,
} from "@mui/material";

import Page from "../components/Page";
import Link from "../components/Link";
import { LoginForm } from "../sections/authentication/login";
import AuthSocial from "../sections/authentication/AuthSocial";

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <RootStyle title="Login">
      <Container maxWidth="sm">
        <ContentStyle>
          <Paper
            sx={{ p: { xs: 2, sm: 6 }, borderRadius: 8 }}
            elevation={xsBreakpoint ? 4 : 0}
          >
            <Stack sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Mind Fuzz Records
              </Typography>
            </Stack>

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
          </Paper>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
