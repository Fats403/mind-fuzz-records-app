import { Box } from "@mui/material";
import Image from "next/image";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ImageIcon from "@mui/icons-material/ImageOutlined";
import LoadingButton from "@mui/lab/LoadingButton";

export default function ImageUpload({
  isLoading,
  disabled = false,
  handleChange,
  imagePreview,
  currentImage,
  size = 150,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ mb: 2 }}>
        {currentImage || imagePreview ? (
          <Image
            src={imagePreview ? imagePreview : currentImage}
            width={size}
            height={size}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              border: "1px dashed grey",
              width: size,
              height: size,
            }}
          >
            <Box sx={{ margin: "auto" }}>
              <ImageIcon
                sx={{
                  width: size / 2,
                  height: size / 2,
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
      <Box>
        <LoadingButton
          loading={isLoading}
          disabled={disabled}
          sx={{ width: 200 }}
          variant="outlined"
          component="label"
          startIcon={<FileUploadIcon />}
        >
          Upload Image
          <input
            accept="image/*"
            hidden
            type="file"
            onChange={(e) => handleChange(e)}
          />
        </LoadingButton>
      </Box>
    </Box>
  );
}
