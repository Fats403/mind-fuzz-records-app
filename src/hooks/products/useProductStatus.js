import { useMemo } from "react";

export default function useProductStatus(product) {
  const status = useMemo(() => {
    const msBetweenDates = Math.abs(
      new Date(product.createdAt).getTime() - Date.now()
    );

    if (msBetweenDates < 86400000) {
      return "new";
    }

    if (product.priceSale) {
      return "sale";
    }

    return null;
  }, [product]);

  return status;
}
