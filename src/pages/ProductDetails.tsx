import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { Product } from "../Types/ApiResponse";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const SingleProdApi = import.meta.env.VITE_SINGLE_PRODUCT_API;

  const fetchSingle = async () => {
    const response = await axios.get(`${SingleProdApi}${id}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ["SingleProduct", id],
    queryFn: fetchSingle,
    enabled: !!id, // only fetch if id exists
  });

  if (!id) {
    return <div>Invalid product ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load product</div>;
  }

  return (
    <div className="h-full w-full ">
      <p>{data?.category}</p>
    </div>
  );
};

export default ProductDetails;
