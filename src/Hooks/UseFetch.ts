import axios from "axios";
import type { ProductsResponse } from "../Types/types";

const UseFetch = async (url: string) :Promise<ProductsResponse> => {
  const response = await axios.get<ProductsResponse>(url);
  return response;
};

export default UseFetch;
