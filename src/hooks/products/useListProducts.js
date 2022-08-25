import useSWR from "swr";
import { fetcher } from "../../services/client";

export default function useListProducts() {
  const { data, error } = useSWR("/api/products", fetcher);

  return {
    products: data?.products || [],
    isLoading: !error && !data,
    error,
  };
}
