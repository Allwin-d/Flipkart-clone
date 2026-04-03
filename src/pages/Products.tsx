import axios from "axios";
import { useSearchParams } from "react-router-dom";
import type { Product } from "../Types/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import { CurrencyConverter, OriginalPrice } from "../utils/utilityFunctions";

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
      {/* This is for the left Side Section */}
      <div className="float-left w-1/4 bg-gray-300 min-h-screen">helo</div>
      <div className="lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 ">
        {/* {data?.map((item) => (
          <div className="flex flex-col space-y-2">
            <img src={item.images[0]}></img>
            <p>{item.brand}</p>
            <p>{item.title}</p>
            <div className="flex space-x-4">
              <p>{CurrencyConverter(item.price)}</p>
              <p>
                {OriginalPrice(
                  CurrencyConverter(item.price),
                  item.discountPercentage,
                )}
              </p>
            </div>
          </div>
        ))} */}
      </div>

      {/* This is for the Right Side Section */}
      <div className="float-right w-3/4 bg-red-400 min-h-screen">{}</div>
    </div>
  );
};

export default Products;
