import React, { useState } from "react";
import Page from "../components/Page";
import ProductList from "../sections/products/ProductList";
import { collection, getDocs } from "firebase/firestore";
import { Container } from "@mui/material";
import HomeLayout from "../layouts/HomeLayout";
import { firestore } from "../services/firebase/client";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "../services/client";
import { SearchBar } from "../sections/products";
import useGlobalFilter from "../hooks/search/useGlobalFilter";

const options = {
  keys: ["title", "description"],
};

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
  const {
    data: { products },
  } = useSWR("/api/products", fetcher, {
    refreshInterval: 60000 * 5,
    revalidateOnFocus: false,
  });

  const [search, setSearch] = useState("");
  const filteredProducts = useGlobalFilter(products, options, search);

  return (
    <HomeLayout>
      <Page title="Home" sx={{ py: 3, px: { xs: 1, sm: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <SearchBar setSearch={setSearch} />
          <ProductList products={filteredProducts} />
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
