import axios from "axios";
import { useSearchParams } from "react-router-dom";
import type { ApiResponseType } from "../Types/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import ProductTile from "../components/ProductTile";

const Products = () => {
  const [searchValue] = useSearchParams(); //this is used to access query parameter values , for eg: /products?search=chicken&category=bucket&price=200&sort=asc&page=2 (HERE THEERE ARE 4 QUERY PARAMS KEY )
  const productValue = searchValue.get("search");

  const PRODUCT_API = import.meta.env.VITE_SEARCH_PRODUCT;

  const fetchProducts = async (): Promise<ApiResponseType | undefined> => {
    try {
      const res = await axios.get<ApiResponseType>(
        `${PRODUCT_API}${productValue}`,
      );
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

      {/* This is for the Right Side Section */}
      <div className="float-right w-3/4 min-h-screen">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 m-4">
          {data?.products?.map((item, index) => (
            <ProductTile
              index={index}
              images={item.images[0]}
              title={item.title}
              brand={item.brand ? item.brand : ""}
              price={item.price}
              discountPercentage={item.discountPercentage}
              id = {item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
