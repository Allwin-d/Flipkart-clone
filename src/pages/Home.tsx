import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ApiResponse } from "../Types/ApiResponse";
import ProductTile from "../components/ProductTile";

const Home = () => {
  const API_URL = import.meta.env.VITE_PRODUCTS_API;

  const fetchProduct = async () => {
    try {
      const data = await axios.get<ApiResponse>(API_URL);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Product"],
    queryFn: fetchProduct,
  });

  console.log("Actual Data :", data?.data);
  console.log("Error State : ", isError);
  console.log("Loading State : ", isLoading);
  console.log("This is from the home component ");

  const categories: string[] = [
    ...new Set(data?.data.products.map((item) => item.category)),
  ];

  console.log("Categories", categories);

  const beauty = data?.data.products.filter(
    (item) => item.category === "beauty" && item.rating >= 2,
  );
  console.log("Beauty Products: ", beauty);

  const phone = data?.data.products
    .filter((item) => item.category === "smartphones" && item.rating > 3)
    .slice(0, 5);
  console.log("Mobile Phone : ", phone);

  const mensDresses = data?.data.products.filter(
    (item) => item.category === "mens-shirts" && item.rating > 2,
  );
  console.log("Mens Dresses : ", mensDresses);

  const laptop = data?.data.products.filter(
    (item) => item.category === "laptops" && item.rating > 2,
  );
  console.log("Laptops : ", laptop);

  const womensDresses = data?.data.products.filter(
    (item) => item.category === "womens-dresses" && item.rating >= 3,
  );
  console.log("Womens Dresses : ", womensDresses);

  if (isError) {
    return (
      <p className="flex h-screen items-center justify-center text-4xl text-red-600 ">
        Failed To Load Data...
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="flex h-screen items-center justify-center text-4xl text-blue-600 ">
        Loading Data ....
      </p>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* This is for the Beauty section  */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mx-auto  mt-4 pb-8 gap-10 ">
        <h1 className="flex items-center justify-center text-3xl ">Beauty </h1>
        {beauty?.map((item) => (
          <ProductTile item={item} key={item.id} />
        ))}
      </div>

      {/* This is for the Mobile Phone Section */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mx-auto mt-4 pb-8 gap-10 ">
        <h1 className="flex items-center justify-center text-3xl ">Phone</h1>
        {phone?.map((item) => (
          <ProductTile item={item} key={item.id} />
        ))}
      </div>

      {/* This is for the Mens Dress Section */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mx-auto mt-4 pb-8 gap-10">
        <h1 className="flex items-center justify-center text-3xl">
          Men's Dress
        </h1>
        {mensDresses?.map((item) => (
          <ProductTile item={item} key={item.id} />
        ))}
      </div>

      {/* This is for the Laptop Section */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mx-auto mt-4 pb-8 gap-10">
        <h1 className="flex items-center justify-center text-3xl ">Laptop</h1>
        {laptop?.map((item) => (
          <ProductTile key={item.id} item={item} />
        ))}
      </div>

      {/* This is for the Women's dress section */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mx-auto mt-4 pb-8  gap-10  ">
        <h1 className="flex items-center justify-center text-3xl">
          Women's Dress
        </h1>
        {womensDresses?.map((item) => (
          <ProductTile item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
