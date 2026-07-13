import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ApiResponseType } from "../Types/ApiResponse";
import Categories from "../components/Categories/Categories";
import type { Category } from "../Types/ApiResponse";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import ProductCategory from "../components/ProductCategory/ProductCategory";
import {
  ERROR_MESSAGE,
  LOADING_MESSAGE,
} from "../Constants/ConstantVariables/constantsVariables";

const Home = () => {
  const API_URL = import.meta.env.VITE_PRODUCTS_API;

  //This is the function which is gonna fetch All the products
  const fetchProducts = async () => {
    try {
      const response = await axios.get<ApiResponseType>(API_URL);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Products"],
    queryFn: fetchProducts,
  });

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

  const BeautyProducts = data?.products.filter((item) => {
    return item.category === "beauty";
  });

  const Laptop = data?.products.filter((item) => {
    return item.category === "laptops";
  });

  const mensShirts = data?.products.filter((item) => {
    return item.category === "mens-shirts";
  });

  const smartPhones = data?.products.filter((item) => {
    return item.category === "smartphones" && item.rating >= 4;
  });

  const womensDresses = data?.products.filter((item) => {
    return item.category === "womens-dresses";
  });

  const groceries = data?.products.filter((item) => {
    return item.category === "groceries" && item.rating > 4;
  });

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center text-blue-600 text-4xl min-h-screen ">
        <p>{LOADING_MESSAGE}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-row items-center justify-center text-red-600 text-4xl min-h-screen">
        <p>{ERROR_MESSAGE}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-12">
      {/* This is for the Categories Section
      in the Categroy section we send data as a prop
      */}
      <Categories category={categories} />
      <HeroBanner />
      <ProductCategory data={BeautyProducts ?? []} title={"Beauty Products"} />
      <ProductCategory data={Laptop ?? []} title="Laptops" />
      <ProductCategory data={mensShirts ?? []} title="Mens-Shirts" />
      <ProductCategory
        data={smartPhones?.slice(0, 5) ?? []}
        title="SmartPhones"
      />
      <ProductCategory
        data={womensDresses?.slice(0, 5) ?? []}
        title="Womens-Dresses"
      />
      <ProductCategory data={groceries?.slice(0, 5) ?? []} title="Groceries" />
    </div>
  );
};

export default Home;
