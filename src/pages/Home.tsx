import { useQuery } from "@tanstack/react-query";
import type { Product, ProductsResponse } from "../Types/types";
import axios from "axios";
import { useMemo } from "react";

const Home = () => {
  const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await axios.get<ProductsResponse>(
      "https://dummyjson.com/products"
    );
    return data.products;
  };

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["Products"],
    queryFn: fetchProducts,
  });

  const beauty = useMemo(() => {
    return (
      data?.filter((item) => {
        return item.category === "beauty";
      }) ?? []
    );
  }, [data]);

  const fragrances = useMemo(() => {
    return (
      data?.filter((item) => {
        return item.category === "fragrances";
      }) ?? []
    );
  }, [data]);

  const furniture = useMemo(() => {
    return (
      data?.filter((item) => {
        return item.category === "furniture";
      }) ?? []
    );
  }, [data]);

  const groceries = useMemo(() => {
    return (
      data?.filter((item) => {
        return item.category === "groceries";
      }) ?? []
    );
  }, [data]);

  console.log("Beauty: ", beauty);
  console.log("Fragrance : ", fragrances);
  console.log("Groceries : ", groceries);
  console.log("Furniture : ", furniture);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong...</p>}

      {!isLoading && !isError && (
        <>
          {/* Beauty */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold">Beauty</h2>
            <ul>
              {beauty.map((item) => (
                <li key={item.id}>
                  {item.title} - ${item.price}
                </li>
              ))}
            </ul>
          </section>

          {/* Fragrances */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold">Fragrances</h2>
            <ul>
              {fragrances.map((item) => (
                <li key={item.id}>
                  {item.title} - ${item.price}
                </li>
              ))}
            </ul>
          </section>

          {/* Furniture */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold">Furniture</h2>
            <ul>
              {furniture.map((item) => (
                <li key={item.id}>
                  {item.title} - ${item.price}
                </li>
              ))}
            </ul>
          </section>

          {/* Groceries */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold">Groceries</h2>
            <ul>
              {groceries.map((item) => (
                <li key={item.id}>
                  {item.title} - ${item.price}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
