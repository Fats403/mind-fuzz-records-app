import * as React from "react";
import Page from "../components/Page";
import ProductList from "../sections/products/ProductList";
import { collection, getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import { Container } from "@mui/material";
import HomeLayout from "../layouts/HomeLayout";
import { firestore } from "../services/firebase/client";

export async function getStaticProps() {
  const snapshot = await getDocs(collection(firestore, "products"));
  const products = snapshot.docs.map((doc) => doc.data());

  return {
    props: { products },
  };
}

export default function Home({ products }) {
  return (
    <HomeLayout>
      <Page title="Home" sx={{ p: { xs: 4, sm: 6 } }}>
        <Container maxWidth="lg">
          <ProductList products={products} />
        </Container>
      </Page>
    </HomeLayout>
  );
}

Home.propTypes = {
  products: PropTypes.array.isRequired,
};
