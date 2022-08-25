import { useCallback, useState } from "react";
import client from "../services/client";

export default function useApi(url, method = "post", options = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    ({ id, params }) => {
      setIsLoading(true);
      return new Promise((resolve, reject) => {
        client({
          method,
          url: id ? `${url}/${id}` : url,
          ...(params && { data: params }),
        })
          .then((res) => {
            resolve(res.data);
          })
          .catch((e) => reject(e))
          .finally(() => setIsLoading(false));
      });
    },
    [url, method]
  );

  return {
    request,
    isLoading,
  };
}
