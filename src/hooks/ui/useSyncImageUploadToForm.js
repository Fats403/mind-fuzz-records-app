import { useEffect } from "react";

export default function useSyncImageUploadToForm({
  form,
  imagePreview,
  name = "image",
}) {
  const { setValue, watch } = form;
  const formValues = watch();

  // NOTE: sync the uploaded image with the form
  useEffect(() => setValue(name, imagePreview), [setValue, imagePreview]);

  // NOTE: sync current product image to image preview
  useEffect(() => formValues.image && setValue(name, formValues.image), []);
}
