import { useQuery } from "@tanstack/react-query";
import type { Product, ProductsResponse } from "../Types/types";
import axios from "axios";
import { useMemo } from "react";
import Footer from "../components/Footer";

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
            <h2 className="text-lg font-semibold">Best of Beauty Products</h2>

            <div className="flex gap-6 w-full">
              {beauty.map((item, index) => {
                return (
                  <div
                    className="flex flex-col text-center w-full items-center justify-center  p-2 hover:shadow-gray-500 hover:shadow-md transition duration-200"
                    key={index}
                  >
                    <img
                      className="w-40 h-30 hover:cursor-pointer"
                      src={item.images}
                      alt={item.brand}
                    ></img>
                    <p className="font-semibold">{item.brand}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Fragrances */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold">Best of Fragrance</h2>
            <div className="flex gap-6 w-full">
              {fragrances.map((item, index) => {
                return (
                  <div
                    className="flex flex-col text-center w-full items-center justify-center"
                    key={index}
                  >
                    <img
                      className="w-40 h-30 hover:cursor-pointer"
                      src={item.images[0]}
                      alt={item.brand}
                    ></img>
                    <p className="font-semibold">{item.brand}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Furniture */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold">Best of Furnitures</h2>
            <div className="flex gap-6 w-full">
              {furniture.map((item, index) => {
                return (
                  <div
                    className="flex flex-col text-center w-full items-center justify-center"
                    key={index}
                  >
                    <img
                      className="w-40 h-30 hover:cursor-pointer"
                      src={item.images[0]}
                      alt={item.brand}
                    ></img>
                    <p className="font-semibold">{item.brand}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Groceries */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold">Best of Groceries</h2>
            <div className="flex gap-6 w-full">
              {groceries
                .map((item, index) => {
                  return (
                    <div
                      className="flex flex-col text-center w-full items-center justify-center"
                      key={index}
                    >
                      <img
                        className="w-40 h-30 hover:cursor-pointer"
                        src={item.images[0]}
                        alt={item.brand}
                      ></img>
                      <p className="font-semibold">
                        {item.description.slice(0, 15)}{" "}
                      </p>
                    </div>
                  );
                })
                .slice(0, 5)}
            </div>
          </section>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
