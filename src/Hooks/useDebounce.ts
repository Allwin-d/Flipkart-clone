import { useEffect, useState } from "react";

export const useDebounce = (search: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timeer = setTimeout(() => {
      setDebounceValue(search);
    }, delay);

    return () => clearTimeout(timeer);
  }, [search, delay]);

  return debounceValue;
};
