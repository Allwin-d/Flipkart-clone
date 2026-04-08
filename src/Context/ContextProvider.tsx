/* eslint-disable react-refresh/only-export-components */

import { createContext } from "react";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product } from "../Types/ApiResponse";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type ContextType = {
  data: ProductsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const Context = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const API_URL = import.meta.env.VITE_PRODUCTS_API;

  const fetchProducts = async (): Promise<ProductsResponse> => {
    const res = await axios.get<ProductsResponse>(API_URL);
    return res.data;
  };

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