import { useCallback, useState } from "react";
import client from "../services/client";

export default function useApi(url, method = "post", options = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    ({ id, params }) => {
      setIsLoading(true);

      let data;

      // sanitize data keys with empty string values
      if (params) {
        data = {};
        Object.keys(params).forEach((key) => {
          const val = params[key];
          if (val !== "") {
            data[key] = params[key];
          }
        });
      }

      return new Promise((resolve, reject) => {
        client({
          method,
          url: id ? `${url}/${id}` : url,
          ...(data && { data }),
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
