import * as React from "react";
import Page from "../components/Page";
import ProductList from "../sections/products/ProductList";
import { collection, getDocs } from "firebase/firestore";
import { Container } from "@mui/material";
import HomeLayout from "../layouts/HomeLayout";
import { firestore } from "../services/firebase/client";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "../services/client";

export async function getStaticProps() {
  const snapshot = await getDocs(collection(firestore, "products"));
  const products = snapshot.docs.map((doc) => doc.data());
  return {
    props: {
      fallback: {
        "/api/products": { products },
      },
    },
  };
}

function Home() {
  const { data } = useSWR("/api/products", fetcher, {
    refreshInterval: 60000 * 5,
    revalidateOnFocus: false,
  });

  return (
    <HomeLayout>
      <Page title="Home" sx={{ p: { xs: 4, sm: 6 } }}>
        <Container maxWidth="lg">
          <ProductList products={data.products} />
        </Container>
      </Page>
    </HomeLayout>
  );
}

export default function Index({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Home />
    </SWRConfig>
  );
}
