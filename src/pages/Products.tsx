import axios from "axios";
import { useSearchParams } from "react-router-dom";
import type { Product } from "../Types/ApiResponse";
import { useQuery } from "@tanstack/react-query";

const Products = () => {
  const [searchValue] = useSearchParams(); //this is used to access query parameter values , for eg: /products?search=chicken&category=bucket&price=200&sort=asc&page=2 (HERE THEERE ARE 4 QUERY PARAMS KEY )
  const productValue = searchValue.get("search");

  const PRODUCT_API = import.meta.env.VITE_SEARCH_PRODUCT;

  const fetchProducts = async (): Promise<Product[] | undefined> => {
    try {
      const res = await axios.get(`${PRODUCT_API}${productValue}`);
      return res.data;
    } catch (err) {
      console.error("Failed to Fetch Data : ", err);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["SearchProducts", productValue], //it means productValue eruntha thaan api call nadakum
    queryFn: fetchProducts,
    enabled: !!productValue, //api call nadakurathuk productValue kandipa erukanum
  });

  console.log("Products after Search : ", data);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-3xl text-blue-600">Loading Data ...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-3xl text-red-600 ">Failed to Fetch Data</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <p>Hello from the Products page ...</p>
    </div>
  );
};

export default Products;
