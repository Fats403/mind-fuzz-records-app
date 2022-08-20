import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import { Container, Paper, useMediaQuery } from "@mui/material";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

export default function AuthLayout({ children }) {
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Container maxWidth="sm">
        <ContentStyle>
          <Paper
            sx={{ p: { xs: 2, sm: 6 }, borderRadius: 8 }}
            elevation={xsBreakpoint ? 4 : 0}
          >
            {children}
          </Paper>
        </ContentStyle>
      </Container>
    </>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
