import axios from "axios";
import { useSearchParams } from "react-router-dom";
import type { ApiResponseType, Product } from "../Types/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import ProductTile from "../components/ProductTile";
import { useMemo, useState } from "react";

const Products = () => {
  const [ratingNumber, setRatingNumber] = useState<null | number>(null);
  const [searchValue] = useSearchParams();
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
    queryKey: ["SearchProducts", productValue],
    queryFn: fetchProducts,
    enabled: !!productValue,
  });

  const handleRating = (num: number) => {
    if (ratingNumber === num) {
      setRatingNumber(null);
    } else {
      setRatingNumber(num);
    }
  };

  const ProductsData: Product[] = useMemo(() => {
    if (ratingNumber) {
      return data?.products.filter((item) => item.rating >= ratingNumber) ?? [];
    }
    return data?.products ?? [];
  }, [ratingNumber, data]);

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
        <p className="text-3xl text-red-600">Failed to Fetch Data</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex">
      {/* Left Side Section */}
      <div className="w-1/4 bg-gray-200 h-screen p-4">
        <div className="flex flex-col space-y-4 justify-center">
          {[1, 2, 3, 4, 5].map((num, index) => (
            <div
              key={index}
              className="flex space-x-3 items-center justify-start"
            >
              <input
                type="checkbox"
                value={num}
                checked={ratingNumber === num}
                onChange={() => handleRating(num)}
                className="text-xl"
              />
              <div className="flex flex-row space-x-2">
                <p className="text-xl">{`⭐`.repeat(num)}</p>
                <p className="text-xl">{num} Above</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Section */}
      <div className="w-3/4 min-h-screen">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 m-4">
          {ProductsData.length ? (
            ProductsData.map((item, key) => (
              <ProductTile
                key={key}
                index={key}
                images={item.images[0]}
                title={item.title}
                brand={item.brand ? item.brand : ""}
                price={item.price}
                discountPercentage={item.discountPercentage}
                id={item.id}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full min-h-screen col-span-4">
              <p className="text-4xl text-red-600 font-bold text-center">
                {ratingNumber
                  ? "No Filtered Products Matched the Selected Rating"
                  : "Try Using Different Words For Searching"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
