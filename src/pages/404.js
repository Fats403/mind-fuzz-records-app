import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";
import Page from "../components/Page";
import Link from "../components/Link";
import Copyright from "../components/Copyright";

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
}));

export default function NotFound404() {
  return (
    <RootStyle title="404 Page Not Found">
      <Container>
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>
          <Typography sx={{ color: "text.secondary", my: 3 }}>
            Sorry, we couldn't find the page you're looking for. Perhaps you've
            mistyped the URL? Be sure to check your spelling.
          </Typography>
          <Button
            href="/"
            size="large"
            variant="contained"
            sx={{ mb: 3 }}
            component={Link}
          >
            Go to Home
          </Button>
          <Copyright />
        </Box>
      </Container>
    </RootStyle>
  );
}
