import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { UserProvider } from "./UserProvider";
import { SnackBarProvider } from "./SnackBarProvider";

function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <SnackBarProvider>{children}</SnackBarProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
