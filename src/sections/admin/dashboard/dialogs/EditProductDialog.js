import { useCallback, useContext, useEffect } from "react";
import Dialog from "../../../../components/dialog/Dialog";
import { useSWRConfig } from "swr";
import { SnackBarContext } from "../../../../contexts/SnackBarProvider";
import useApi from "../../../../hooks/useApi";
import ProductForm from "../ProductForm";
import { useForm } from "react-hook-form";
import { DialogContext } from "../../../../contexts/DialogProvider";

function EditProductDialog() {
  const { showMessage } = useContext(SnackBarContext);
  const { handleClose, open, data, name } = useContext(DialogContext);

  const form = useForm();
  const {
    handleSubmit,
    watch,
    reset,
    formState: { isDirty },
  } = form;
  const formValues = watch();

  const { mutate } = useSWRConfig();
  const { request, isLoading } = useApi("/api/products", "post");

  const editProduct = useCallback(() => {
    request({ id: data.id, params: formValues })
      .then(() => {
        reset({});
        mutate("/api/products");

        handleClose();
        showMessage({
          message: "Product successfully updated.",
          severity: "success",
        });
      })
      .catch((e) => showMessage({ message: e.error, severity: "error" }));
  }, [formValues, data]);

  useEffect(() => reset(data), [reset, data]);

  return (
    <Dialog
      fullWidth
      disabled={!isDirty}
      isLoading={isLoading}
      titleText="Edit Product"
      onSubmit={() => handleSubmit(editProduct)()}
      submitButtonText={"Update"}
      onCancel={() => handleClose()}
      open={open && name === "edit-product"}
    >
      <ProductForm form={form} isLoading={isLoading} />
    </Dialog>
  );
}

export default EditProductDialog;
