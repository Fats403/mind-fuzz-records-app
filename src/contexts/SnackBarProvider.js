import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import PropTypes from "prop-types";
import { useState, createContext } from "react";

const SnackBarContext = createContext({});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBarProvider({ children }) {
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: null,
    severity: null,
  });

  const showMessage = ({ message, severity = "success" }) => {
    setSnackBar({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnackBar({ ...snackBar, open: false });
  };

  return (
    <>
      <SnackBarContext.Provider value={{ showMessage }}>
        {children}
      </SnackBarContext.Provider>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={snackBar.severity}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

SnackBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SnackBarProvider, SnackBarContext };
