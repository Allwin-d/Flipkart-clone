import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ApiResponseType } from "../Types/ApiResponse";
import Categories from "../components/Categories";
import type { Category } from "../Types/ApiResponse";

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
  console.log("Loading State from the Home Page : ", isLoading);
  console.log("Error state from the Home page : ", isError);

  // Getting the categories details

  const categories: Category[] = Object.values(
    //the Object.Values is convert the object into an array
    (data?.products ?? []).reduce<Record<string, Category>>((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = {
          category: product.category,
          image: product.thumbnail,
        };
      }
      return acc;
    }, {}), //initially the acc is just empty object ,
  );

  console.log("Categories from the Home Page : ", categories);

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center text-blue-600 text-4xl min-h-screen ">
        <p>Loading Data ....</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-row items-center justify-center text-red-600 text-4xl min-h-screen">
        <p>Failed to fetch Data ..</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-12">
      {/* This is for the Categories Section  
      in the Categroy section we send data as a prop 
      */}
      <Categories category={categories} />
    </div>
  );
};

export default Home;
