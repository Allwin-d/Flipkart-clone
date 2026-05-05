import axios from "axios";
import type { ApiResponseType } from "../Types/ApiResponse";
export const fetchProducts = async (): Promise<ApiResponseType> => {
  const API_URL = import.meta.env.VITE_PRODUCTS_API;
  const res = await axios.get<ApiResponseType>(API_URL);
  return res.data;
};
