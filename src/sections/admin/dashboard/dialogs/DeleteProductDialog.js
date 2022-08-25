import { Typography } from "@mui/material";
import { useCallback, useContext } from "react";
import Dialog from "../../../../components/dialog/Dialog";
import { SnackBarContext } from "../../../../contexts/SnackBarProvider";
import { useSWRConfig } from "swr";
import useApi from "../../../../hooks/useApi";
import { DialogContext } from "../../../../contexts/DialogProvider";

function DeleteProductDialog() {
  const { showMessage } = useContext(SnackBarContext);
  const { handleClose, open, data, name } = useContext(DialogContext);

  const { mutate } = useSWRConfig();
  const { request, isLoading } = useApi("/api/products", "delete");

  const deleteProduct = useCallback(() => {
    request({ id: data.id })
      .then(() => {
        mutate("/api/products");

        handleClose();
        showMessage({
          message: "Product successfully deleted.",
          severity: "success",
        });
      })
      .catch((e) => showMessage({ message: e.error, severity: "error" }));
  }, [data]);

  return (
    <Dialog
      fullWidth
      deleteAction
      isLoading={isLoading}
      titleText={`Delete ${data?.title}`}
      onSubmit={() => deleteProduct()}
      onCancel={() => handleClose()}
      submitButtonText="DELETE"
      open={open && name === "delete-product"}
    >
      <Typography>
        Are you sure you want to delete this product? This can't be undone.
      </Typography>
    </Dialog>
  );
}

export default DeleteProductDialog;
