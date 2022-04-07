import * as React from "react";
import Page from "../components/Page";
import ProductList from "../sections/products/ProductList";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { UserContext } from "../contexts/UserProvider";
import PropTypes from "prop-types";
import { Container } from "@mui/material";

export async function getStaticProps() {
  const snapshot = await getDocs(collection(firestore, "products"));
  const products = snapshot.docs.map((doc) => doc.data());

  return {
    props: { products },
  };
}

export default function Home({ products }) {
  const { user, authRecord } = React.useContext(UserContext);
  console.log(user, authRecord);
  return (
    <Page title={"Home"} sx={{ p: { xs: 4, sm: 6 } }}>
      <Container maxWidth="lg">
        <ProductList products={products} />
      </Container>
    </Page>
  );
}

Home.propTypes = {
  products: PropTypes.array.isRequired,
};
