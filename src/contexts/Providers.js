import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { UserProvider } from "./UserProvider";
import { SnackBarProvider } from "./SnackBarProvider";
import { DialogProvider } from "./DialogProvider";

function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <SnackBarProvider>
          <DialogProvider>{children}</DialogProvider>
        </SnackBarProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
