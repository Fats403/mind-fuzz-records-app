import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.length ? (
        <>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </>
      ) : (
        <Box sx={{ width: "100%", mt: 4 }}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            No search results found.
          </Typography>
        </Box>
      )}
    </Grid>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};
