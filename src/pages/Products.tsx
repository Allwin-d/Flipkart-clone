import axios from "axios";
import { useSearchParams } from "react-router-dom";
import type {
  ApiResponseType,
  Product,
  UserComments,
} from "../Types/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import ProductTile from "../components/ProductTile";
import { useMemo, useState } from "react";
import {
  DISCOUNT_PERCENTAGE,
  ERROR_MESSAGE,
  LOADING_MESSAGE,
  NO_FILTERED_PRODUCTS_MESSAGE,
  NO_SEARCHED_PRODUCTS_MESSAGE,
  PRICE_RANGE,
  PRICE_RANGE_VALUES,
} from "../Constants/Constants";
import { CurrencyConverter } from "../utils/utilityFunctions";

const Products = () => {
  const [ratingNumber, setRatingNumber] = useState<null | number>(null);
  const [discountNumber, setDiscountNumber] = useState<null | number>(null);
  const [priceNumber, setPriceNumber] = useState<null | number>(null);
  const [searchValue] = useSearchParams();
  const productValue = searchValue.get("search");

  const COMMENTS_API = import.meta.env.VITE_COMMENTS_BASE_URL;
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

  const fetchCommentsRating = async (): Promise<UserComments | null> => {
    const res = await axios.get(COMMENTS_API);
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["SearchProducts", productValue],
    queryFn: fetchProducts,
    enabled: !!productValue,
  });

  const { data: CommentsRating } = useQuery({
    queryKey: ["CommentsRating"],
    queryFn: fetchCommentsRating,
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

  const handlePriceRange = (index: number) => {
    if (priceNumber === index) {
      setPriceNumber(null);
    } else {
      setPriceNumber(index);
    }
  };

  const ProductsData: Product[] = useMemo(() => {
    if (!data?.products) return [];

    let filteredProducts = data.products;

    if (ratingNumber && CommentsRating) {
      const productIdsWithRating = CommentsRating?.filter(
        (comment) => comment.rating >= ratingNumber,
      ).map((comment) => Number(comment.productId));

      filteredProducts = filteredProducts.filter((product) =>
        productIdsWithRating?.includes(product.id),
      );
    }

    if (discountNumber !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.discountPercentage >= discountNumber,
      );
    }

    if (priceNumber !== null) {
      if (PRICE_RANGE_VALUES[priceNumber].max === Infinity) {
        filteredProducts = filteredProducts.filter(
          (item) =>
            CurrencyConverter(item.price) >=
            PRICE_RANGE_VALUES[priceNumber].min,
        );
      } else {
        filteredProducts = filteredProducts.filter(
          (item) =>
            CurrencyConverter(item.price) >=
              PRICE_RANGE_VALUES[priceNumber].min &&
            CurrencyConverter(item.price) <=
              PRICE_RANGE_VALUES[priceNumber].max,
        );
      }
    }

    return filteredProducts;
  }, [data, ratingNumber, discountNumber, CommentsRating, priceNumber]);

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
    <div className="w-full h-full flex">
      {/* Left Side Section */}

      <div className="w-1/4 bg-gray-200 h-screen p-4 fixed  overflow-x-hidden">
        {/* This is for the Rating filter section */}
        <div className="flex flex-col space-y-4 justify-center">
          {[1, 2, 3, 4, 5].map((num, index) => (
            <div
              key={index}
              className="flex space-x-3 items-center justify-start text-2xl font-semibold"
            >
              <input
                type="checkbox"
                value={num}
                checked={ratingNumber === num}
                onChange={() => handleRating(num)}
                className="scale-150"
              />
              <div className="flex flex-row space-x-2">
                <p className="">{`⭐`.repeat(num)}</p>
                <p className="">{num} Above</p>
              </div>
            </div>
          ))}
        </div>

        {/* This is for the Discount Filter Section */}
        <div className="flex flex-col space-y-4 justify-center mt-16">
          <h1 className="font-bold text-2xl">{DISCOUNT_PERCENTAGE}</h1>
          {[10, 15, 20].map((num, index) => (
            <div
              key={index}
              className="flex space-x-3 items-center justify-start text-2xl font-semibold"
            >
              <input
                type="checkbox"
                value={num}
                checked={discountNumber === num}
                onChange={() => handleDiscount(num)}
                className="scale-150"
              />
              <div className="flex flex-row space-x-2">
                <p className="">% {num} Above </p>
              </div>
            </div>
          ))}
        </div>

        {/* This is for the Price range Filter Section */}
        <div className="flex flex-col spacey-y-4 justify-center mt-16">
          <h1 className="font-bold text-2xl">{PRICE_RANGE}</h1>
          {PRICE_RANGE_VALUES.map((num, index) => (
            <div
              key={index}
              className="flex space-x-3 items-center justify-start text-2xl font-semibold"
            >
              <input
                type="checkbox"
                value={index}
                checked={priceNumber === index}
                onChange={() => handlePriceRange(index)}
                className="scale-150"
              />
              <span className="m-2">
                {num.min === 10000 ? `${num.min}` : `${num.min} - ${num.max}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Section */}
      <div className="w-3/4 min-h-screen ml-[25%]">
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
                {ratingNumber || discountNumber || priceNumber
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
