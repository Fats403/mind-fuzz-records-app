import { Box, InputAdornment, Stack } from "@mui/material";
import ControlledMuiTextfield from "../../../components/inputs/ControlledMuiTextfield";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Controller } from "react-hook-form";
import useImageUpload from "../../../hooks/ui/useImageUpload";
import ImageUpload from "../../../components/inputs/ImageUpload";
import useSyncImageUploadToForm from "../../../hooks/ui/useSyncImageUploadToForm";

export default function ProductForm({ form, isLoading }) {
  const {
    control,
    formState: { errors },
    clearErrors,
    watch,
  } = form;

  const formValues = watch();
  console.log(formValues.priceSale);

  const {
    isLoading: isLoadingImage,
    handleInputChange,
    imagePreview,
  } = useImageUpload("products");

  useSyncImageUploadToForm({ form, imagePreview });

  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <Controller
        name="image"
        control={control}
        render={() => (
          <ImageUpload
            disabled={isLoading}
            currentImage={formValues.image}
            isLoading={isLoadingImage}
            handleChange={handleInputChange}
            imagePreview={imagePreview}
          />
        )}
      />
      <ControlledMuiTextfield
        size="small"
        disabled={isLoading}
        fullWidth={true}
        required={true}
        type="text"
        rules={{
          required: {
            value: true,
            message: `This field is required.`,
          },
        }}
        error={errors.title}
        control={control}
        name="title"
        label={"Title"}
        InputLabelProps={{ shrink: true }}
        onFocus={() => clearErrors("title")}
      />
      <ControlledMuiTextfield
        size="small"
        disabled={isLoading}
        fullWidth={true}
        required={true}
        type="text"
        rules={{
          required: {
            value: true,
            message: `This field is required.`,
          },
        }}
        error={errors.artist}
        control={control}
        name="artist"
        label={"Artist"}
        InputLabelProps={{ shrink: true }}
        onFocus={() => clearErrors("artist")}
      />
      <ControlledMuiTextfield
        size="small"
        disabled={isLoading}
        fullWidth={true}
        required={true}
        type="text"
        rules={{
          required: {
            value: true,
            message: `This field is required.`,
          },
        }}
        rows={2}
        error={errors.description}
        control={control}
        name="description"
        label={"Description"}
        InputLabelProps={{ shrink: true }}
        onFocus={() => clearErrors("description")}
      />
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: "100%" }}>
          <ControlledMuiTextfield
            size="small"
            disabled={isLoading}
            fullWidth={true}
            required={true}
            type={"number"}
            rules={{
              required: {
                value: true,
                message: `This field is required.`,
              },
            }}
            error={errors.price}
            control={control}
            name="price"
            label={`Price`}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            onFocus={() => clearErrors("price")}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <ControlledMuiTextfield
            size="small"
            disabled={isLoading}
            fullWidth={true}
            type={"number"}
            rules={{
              ...(formValues.priceSale
                ? {
                    validate: (val) =>
                      (formValues.price && val >= formValues.price) ||
                      "Sale price cannot be lower then true price.",
                  }
                : {}),
            }}
            error={errors.priceSale}
            control={control}
            name="priceSale"
            label={`Sale Price`}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            onFocus={() => clearErrors("priceSale")}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
