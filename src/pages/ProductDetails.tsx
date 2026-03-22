import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import type { Product } from "../Types/ApiResponse";

const ProductDetails = () => {
  // 🔹 Hooks
  const [searchParams] = useSearchParams();
  console.log("useSearchParams:", searchParams.get("category"));
  // 👉 URL la irukkura query params ah edukka use pannuvom

  const location = useLocation();
  console.log("useLocation:", location);
  // 👉 Current URL oda full details ah kudukkum

  const { id } = useParams();
  console.log("Product ID:", id);
  // 👉 URL path la irukkura dynamic values ah edukka use pannuvom

  // 🔹 API URL
  const SingleProductApi = import.meta.env.VITE_SINGLE_PRODUCT_API;
  console.log("API URL:", SingleProductApi);

  // 🔹 Fetch function
  const fetchSingleProduct = async (): Promise<Product> => {
    const res = await axios.get<Product>(`${SingleProductApi}${id}`);
    return res.data;
  };

  // 🔹 React Query
  const { data, isError, isLoading } = useQuery({
    queryKey: ["SingleProduct", id],
    queryFn: fetchSingleProduct,
    enabled: !!id,
  });

  console.log("Single Product Data:", data);

  // 🔹 Loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-600 text-4xl">Loading Data....</p>
      </div>
    );
  }

  // 🔹 Error UI
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-4xl">Failed to Fetch Data</p>
      </div>
    );
  }

  // 🔹 No UI rendering (just empty page)
  return <div className="min-h-screen"></div>;
};

export default ProductDetails;
