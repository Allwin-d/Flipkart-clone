import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ProductsResponse } from "../Types/types";
import { CurrConv } from "../utils/CurrConv";
import Footer from "../components/Footer";

const Home = () => {
  const API_URL = import.meta.env.VITE_API_KEY;

  async function fetchProduct() {
    const data = await axios.get<ProductsResponse>(API_URL);
    console.log(data.data, "actual data");
    return data.data;
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["DummyJsonProducts"],
    queryFn: fetchProduct,
  });

  const beauty = data?.products.filter((item) => {
    return item.category === "beauty";
  });
  console.log("Beauty Products ", beauty);

  const cat = [...new Set(data?.products.map((item) => item.category))];
  console.log(cat, "Categories");

  const Laptops = data?.products.filter((item) => {
    return item.category === "laptops" && item.rating > 2;
  });
  console.log("Laptops:", Laptops);

  const Mobiles = data?.products
    .filter((item) => item.category === "smartphones" && item.rating > 3)
    .slice(0, 5);
  console.log("Mobiles", Mobiles);

  const WomenDress = data?.products.filter(
    (item) => item.category === "womens-dresses"
  );
  console.log("WomensDresses", WomenDress);

  const MenDress = data?.products.filter(
    (item) => item.category === "mens-shirts"
  );
  console.log("Mens Dress : ", MenDress);

  if (isLoading) {
    return <p>Loading Data...</p>;
  }

  if (isError) {
    return <p>Error Failed to Fetch data..</p>;
  }

  return (
    <div>
      {/* Thsis is for the Beauty Products  */}
      <div className="m-6">
        <h1 className="text-2xl font-mono">Beauty Products</h1>
        <div className="flex flex-row justify-between items-center ">
          {beauty?.map((item) => {
            return (
              <div className="flex flex-row space-x-8">
                <div className="flex flex-col justify-center items-center hover:cursor-pointer hover:scale-105 hover:transition-all duration-100">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-60 h-60"
                  ></img>
                  <p className="font-mono text-md ">{item.title}</p>
                  <p className="font-bold text-sm "> ₹{CurrConv(item.price)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* This is for the Laptops */}
      <div className="m-6">
        <h1 className="text-2xl font-mono">Laptops</h1>
        <div className="flex flex-row justify-between items-center ">
          {Laptops?.map((item) => {
            return (
              <div className="flex flex-row space-x-8">
                <div className="flex flex-col justify-center items-center hover:cursor-pointer hover:scale-105 hover:transition-all duration-100">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-60 h-60"
                  ></img>
                  <p className="font-mono text-md ">{item.title}</p>
                  <p className="font-bold text-sm "> ₹{CurrConv(item.price)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* this is for the Mobiles */}
      <div className="m-6">
        <h1 className="text-2xl font-mono">Mobile</h1>
        <div className="flex flex-row justify-between items-center ">
          {Mobiles?.map((item) => {
            return (
              <div className="flex flex-row space-x-8">
                <div className="flex flex-col justify-center items-center hover:cursor-pointer hover:scale-105 hover:transition-all duration-100">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-60 h-60"
                  ></img>
                  <p className="font-mono text-md ">{item.title}</p>
                  <p className="font-bold text-sm "> ₹{CurrConv(item.price)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* This is for Womens's dress  */}
      <div className="m-6">
        <h1 className="text-2xl font-mono">Womens Dress</h1>
        <div className="flex flex-row justify-between items-center ">
          {WomenDress?.map((item) => {
            return (
              <div className="flex flex-row space-x-8">
                <div className="flex flex-col justify-center items-center hover:cursor-pointer hover:scale-105 hover:transition-all duration-100">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-60 h-60"
                  ></img>
                  <p className="font-mono text-md ">{item.title}</p>
                  <p className="font-bold text-sm "> ₹{CurrConv(item.price)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/*this is for Mens dress section   */}
      <div className="m-6">
        <h1 className="text-2xl font-mono">Mens Dress</h1>
        <div className="flex flex-row justify-between items-center ">
          {MenDress?.map((item) => {
            return (
              <div className="flex flex-row space-x-8">
                <div className="flex flex-col justify-center items-center hover:cursor-pointer hover:scale-105 hover:transition-all duration-100">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-60 h-60"
                  ></img>
                  <p className="font-mono text-md ">{item.title}</p>
                  <p className="font-bold text-sm "> ₹{CurrConv(item.price)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
