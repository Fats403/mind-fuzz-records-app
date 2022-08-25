import PropTypes from "prop-types";
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { fCurrency } from "../../utils/formatNumber";
import Image from "next/image";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Label from "./ProductChip";
import useProductStatus from "../../hooks/products/useProductStatus";

const ProductImgStyle = styled(Image)({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

export default function ProductCard({ product }) {
  const { title, image, price, priceSale, artist } = product;
  const status = useProductStatus(product);

  return (
    <Card
      elevation={0}
      sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }}
    >
      <Box sx={{ pt: "100%", position: "relative" }}>
        {status && (
          <Label
            variant="filled"
            color={(status === "sale" && "error") || "info"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={title} src={image} layout="fill" />
      </Box>

      <Stack spacing={2} sx={{ p: { xs: 3, sm: 2 } }}>
        <Box>
          <Link>
            <Typography variant="subtitle2" noWrap>
              {title}
            </Typography>
          </Link>
          <Typography variant="caption" noWrap>
            {artist}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="end" justifyContent="space-between">
          <Box>
            <Tooltip title="Add to cart">
              <IconButton
                sx={{
                  border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                  borderRadius: 2,
                }}
              >
                <AddShoppingCartIcon sx={{ width: 16, height: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Favorite">
              <IconButton
                sx={{
                  border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                  borderRadius: 2,
                  ml: 1,
                }}
              >
                <FavoriteBorderIcon sx={{ width: 16, height: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {priceSale && (
              <Typography
                component="span"
                variant="body1"
                sx={{
                  mr: 1,
                  fontSize: 12,
                  color: "text.disabled",
                  textDecoration: "line-through",
                }}
              >
                {fCurrency(priceSale)}
              </Typography>
            )}
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
};
