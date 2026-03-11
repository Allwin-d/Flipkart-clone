import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ApiResponseType } from "../Types/ApiResponse";

const Home = () => {
  const API_URL = import.meta.env.VITE_PRODUCTS_API;
  console.log("Api url : ", API_URL);

  // This is the function which is gonna fetch All the products
  const fetchProducts = async () => {
    try {
      const response = await axios.get<ApiResponseType>(API_URL);
      return response.data;
    } catch (err) {
      console.log("Failed to fetch Data : ", err);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Products"],
    queryFn: fetchProducts,
  });

  console.log("Products Data : ", data);
  console.log(isLoading);
  console.log(isError);

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center text-blue-600 text-4xl ">
        <p>Loading Data ....</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-row items-center justify-center text-red-600 text-4xl">
        <p>Failed to fetch Data ..</p>
      </div>
    );
  }

  return <div></div>;
};

export default Home;
