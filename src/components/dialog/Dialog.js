import React from "react";
import Button from "@mui/material/Button";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Dialog({
  submitButtonText = `Submit`,
  cancelButtonText = `Cancel`,
  maxWidth = "sm",
  fullWidth = true,
  fullScreen = false,
  handleClose = null,
  centerActions = false,
  centerTitle = false,
  deleteAction = false,
  isLoading = false,
  autoFocus = false,
  disabled = false,
  titleText,
  onSubmit,
  onCancel,
  children,
  open,
}) {
  return (
    <MuiDialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      {titleText && (
        <DialogTitle
          sx={{ ...(centerTitle ? { textAlign: "center" } : {}) }}
          id="alert-dialog-title"
        >
          {titleText}
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      <DialogActions
        sx={{
          mr: 1,
          mb: 1,
          ...(centerActions
            ? { display: "flex", justifyContent: "center" }
            : {}),
        }}
      >
        {onCancel && (
          <Button variant="outlined" onClick={onCancel} disabled={isLoading}>
            {cancelButtonText}
          </Button>
        )}
        {onSubmit && (
          <LoadingButton
            disabled={disabled}
            loading={isLoading}
            color={deleteAction ? "error" : "primary"}
            variant="contained"
            onClick={onSubmit}
            autoFocus={autoFocus}
          >
            {submitButtonText}
          </LoadingButton>
        )}
      </DialogActions>
    </MuiDialog>
  );
}
