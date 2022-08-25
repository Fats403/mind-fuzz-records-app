import { useCallback, useContext } from "react";
import Dialog from "../../../../components/dialog/Dialog";
import { useSWRConfig } from "swr";
import { SnackBarContext } from "../../../../contexts/SnackBarProvider";
import useApi from "../../../../hooks/useApi";
import ProductForm from "../ProductForm";
import { useForm } from "react-hook-form";
import { DialogContext } from "../../../../contexts/DialogProvider";

function AddProductDialog() {
  const form = useForm();
  const {
    handleSubmit,
    watch,
    reset,
    formState: { isDirty },
  } = form;
  const formValues = watch();

  const { handleClose, open, name } = useContext(DialogContext);
  const { showMessage } = useContext(SnackBarContext);
  const { mutate } = useSWRConfig();
  const { request, isLoading } = useApi("/api/products", "post");

  const addProduct = useCallback(() => {
    request({ params: formValues })
      .then(() => {
        reset();
        mutate("/api/products");

        handleClose();
        showMessage({
          message: "Product successfully created.",
          severity: "success",
        });
      })
      .catch((e) => showMessage({ message: e.error, severity: "error" }));
  }, [formValues]);

  return (
    <Dialog
      fullWidth
      disabled={!isDirty}
      isLoading={isLoading}
      titleText="Add Product"
      onSubmit={() => handleSubmit(addProduct)()}
      submitButtonText={"Create"}
      onCancel={() => handleClose()}
      open={open && name === "add-product"}
    >
      <ProductForm form={form} isLoading={isLoading} />
    </Dialog>
  );
}

export default AddProductDialog;
