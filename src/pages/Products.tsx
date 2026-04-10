import axios from "axios";
import { useSearchParams } from "react-router-dom";
import type { ApiResponseType, Product } from "../Types/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import ProductTile from "../components/ProductTile";
import { useMemo, useState } from "react";
import {
  DISCOUNT_TITLE,
  ERROR_MESSAGE,
  LOADING_MESSAGE,
  NO_FILTERED_PRODUCTS_MESSAGE,
  NO_SEARCHED_PRODUCTS_MESSAGE,
} from "../Constants/Constants";

const Products = () => {
  const [ratingNumber, setRatingNumber] = useState<null | number>(null);
  const [discountNumber, setDiscountNumber] = useState<null | number>(null);
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

  const handleDiscount = (num: number) => {
    if (discountNumber === num) {
      setDiscountNumber(null);
    } else {
      setDiscountNumber(num);
    }
  };

  const ProductsData: Product[] = useMemo(() => {
    if (ratingNumber) {
      return data?.products.filter((item) => item.rating >= ratingNumber) ?? [];
    } else if (discountNumber) {
      return (
        data?.products.filter(
          (item) => item.discountPercentage >= discountNumber,
        ) ?? []
      );
    }
    return data?.products ?? [];
  }, [data, ratingNumber, discountNumber]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-3xl text-blue-600">{LOADING_MESSAGE}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-3xl text-red-600">{ERROR_MESSAGE}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex">
      {/* Left Side Section */}

      {/* This is for the Rating filter section */}
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

        {/* This is for the Discount Filter Section */}
        <div className="flex flex-col space-y-4 justify-center my-6">
          <h1>{DISCOUNT_TITLE}</h1>
          {[10, 20, 30].map((num, index) => (
            <div
              key={index}
              className="flex space-x-3 items-center justify-start"
            >
              <input
                type="checkbox"
                value={num}
                checked={discountNumber === num}
                onChange={() => handleDiscount(num)}
                className="text-xl"
              />
              <div className="flex flex-row space-x-2">
                <p className="text-xl ">% {num} Above </p>
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
                  ? `${NO_FILTERED_PRODUCTS_MESSAGE}`
                  : `${NO_SEARCHED_PRODUCTS_MESSAGE}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
