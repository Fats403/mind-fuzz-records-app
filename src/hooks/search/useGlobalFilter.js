import { useMemo, useEffect, useState } from "react";
import Fuse from "fuse.js";

const defaultOptions = {
  threshold: 0.2,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
};

export default function useGlobalFilter(data = [], options = {}, search) {
  const [filteredData, setFilteredData] = useState(data);

  const _options = useMemo(
    () => ({ ...defaultOptions, ...options }),
    [options]
  );

  const fuse = useMemo(() => {
    return new Fuse(data, _options);
  }, [_options, data]);

  useEffect(() => {
    if (!search) return;

    setFilteredData(
      fuse.search(search).reduce((acc, cur) => {
        acc.push(cur.item);
        return acc;
      }, [])
    );
  }, [search, fuse]);

  // NOTE: returns all data when no search value is provided
  return search ? filteredData : data;
}
