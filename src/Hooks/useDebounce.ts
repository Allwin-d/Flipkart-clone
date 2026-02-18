import { useState, useEffect } from "react";

export const useDebounce = <T>(search: T, delay: number): T => {
  const [debounceValue, setDebounceValue] = useState<T>(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(search);
    }, delay);

    return () => clearTimeout(timer);
  }, [search, delay]);

  return debounceValue;
};
