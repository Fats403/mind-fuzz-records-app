import { styled, useTheme } from "@mui/material/styles";
import {
  Stack,
  Container,
  Typography,
  Paper,
  useMediaQuery,
} from "@mui/material";
import Page from "../components/Page";
import { ResetPasswordForm } from "../sections/authentication/reset-password";

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

export default function ResetPassword() {
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <RootStyle title="Reset Password">
      <Container maxWidth="sm">
        <ContentStyle>
          <Paper
            sx={{ p: { xs: 2, sm: 6 }, borderRadius: 8 }}
            elevation={xsBreakpoint ? 4 : 0}
          >
            <Stack sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Reset Password
              </Typography>
            </Stack>

            <ResetPasswordForm />
          </Paper>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
