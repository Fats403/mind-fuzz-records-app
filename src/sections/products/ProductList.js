import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={6} {...other} justifyContent="center">
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};
