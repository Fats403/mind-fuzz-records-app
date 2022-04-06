import PropTypes from "prop-types";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { fCurrency } from "../../utils/formatNumber";
import Image from "next/image";
import Label from "./ProductChip";

const ProductImgStyle = styled(Image)({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

export default function ProductCard({ product }) {
  const { title, thumbnail, price, priceSale, artist, status } = product;

  return (
    <Card>
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
        <ProductImgStyle alt={title} src={thumbnail} layout="fill" />
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
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <Typography variant="subtitle1">
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
