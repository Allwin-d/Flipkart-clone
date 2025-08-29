import { useQuery } from "@tanstack/react-query";
import type { Product, ProductsResponse } from "../Types/types";
import axios from "axios";

const Home = () => {
  const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await axios.get<ProductsResponse>(
      "https://dummyjson.com/products"
    );
    console.log("This is the data : ", data);
    return data.products;
  };

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["Products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <ul>
        {data?.map((item) => (
          <li key={item.id} className="mb-2">
            <p>{item.title}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
