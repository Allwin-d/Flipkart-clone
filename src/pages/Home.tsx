import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ApiResponse } from "../Types/ApiResponse";

const Home = () => {
  const API_URL = import.meta.env.VITE_PRODUCTS_API;
  console.log("import.meta.env", API_URL);

  const fetchProducts = async () => {
    const data = await axios.get<ApiResponse>(API_URL);
    return data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: fetchProducts,
    // refetchInterval : we use this because after the specific time , it will refetch the data from the server , for eg :in the weather app , the weather updates for like every sec
  });

  console.log("Data : ", data?.data.products);

  const categories = new Set(data?.data.products.map((item) => item.category));
  console.log("Categories ", categories); //this are the different categories for the products

  const beautyProducts = data?.data.products.filter(
    (item) => item.category === "beauty"
  );
  console.log("beautyProducts: ", beautyProducts);

  const Fragrances = data?.data.products.filter(
    (item) => item.category === "fragrances"
  );
  console.log("Fragrances: ", Fragrances);

  const Laptops = data?.data.products.filter(
    (item) => item.category === "laptops"
  );
  console.log("Laptops: ", Laptops);

  const smartPhones = data?.data.products.filter(
    (item) => item.category === "smartphones"
  );
  console.log("SmartPhones : ", smartPhones);

  const mensShirts = data?.data.products.filter(
    (item) => item.category === "mens-shirts"
  );
  console.log("Mens Shirts : ", mensShirts);

  const womansDresses = data?.data.products.filter(
    (item) => item.category === "womens-dresses"
  );

  console.log("Womans Dresses : ", womansDresses);

  if (isLoading) {
    return (
      <div>
        <p>Loading ....</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Failed to fetch Data ....</p>
      </div>
    );
  }

  return <div></div>;
};

export default Home;
