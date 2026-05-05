/* eslint-disable react-refresh/only-export-components */

import { createContext } from "react";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ContextType } from "./context.types";
import { fetchProducts } from "../api/product";

export const Context = createContext<ContextType | null>(null);
const ContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productsData"],
    queryFn: fetchProducts,
  });

  return (
    <Context.Provider value={{ data, isLoading, isError }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
