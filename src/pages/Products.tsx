import axios from "axios";
import { useSearchParams } from "react-router-dom";
import type { ApiResponseType, Product } from "../Types/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import ProductTile from "../components/ProductTile/ProductTile";
import { useMemo, useState } from "react";
import {
  CATEGORY,
  CUSTOMER_RATING,
  DISCOUNT,
  ERROR_MESSAGE,
  LOADING_MESSAGE,
  NO_FILTERED_PRODUCTS_MESSAGE,
  NO_SEARCHED_PRODUCTS_MESSAGE,
  PRICE_RANGE,
} from "../Constants/ConstantVariables/constantsVariables";
import { PRICE_RANGE_VALUES } from "../Constants/ConstantArrays/constantsArrays";
import { Capitalize, CurrencyConverter } from "../utils/utilityFunctions";
import Input from "../components/Input/Input";
import { fetchComment } from "../api/comment";

const Products = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [ratingNumber, setRatingNumber] = useState<null | number>(null);
  const [discountNumber, setDiscountNumber] = useState<null | number>(null);
  const [priceNumber, setPriceNumber] = useState<null | number>(null);
  const [categroyfilter, setCategoryFilter] = useState<null | number>(null);

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

  const { data: CommentsRating } = useQuery({
    queryKey: ["CommentsRating"],
    queryFn: fetchComment,
  });

  const categoryCountMap = useMemo(() => {
    const map: Record<string, number> = {};

    for (const val of data?.products ?? []) {
      map[val.category] = (map[val.category] || 0) + 1;
    }

    return Object.entries(map);
  }, [data]);

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

    if (categroyfilter !== null) {
      const selectedCategory = categoryCountMap[categroyfilter]?.[0];

      filteredProducts = filteredProducts.filter(
        (item) => item.category === selectedCategory,
      );
    }

    return filteredProducts;
  }, [
    data,
    ratingNumber,
    discountNumber,
    CommentsRating,
    priceNumber,
    categroyfilter,
    categoryCountMap,
  ]);

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

  const handleCategory = (item: number) => {
    if (categroyfilter === item) {
      setCategoryFilter(null);
    } else {
      setCategoryFilter(item);
    }
  };

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
    <div className="flex h-full w-full flex-col lg:flex-row">
      {/* Left Side Section */}
      <aside className="w-full bg-gray-100 p-4 sm:p-6 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:w-1/4 lg:shrink-0 lg:overflow-y-auto lg:p-8 lg:pb-16 scrollbar-hide">
        <button
          type="button"
          className="mb-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-left font-semibold text-white lg:hidden"
          aria-expanded={showFilters}
          onClick={() => setShowFilters((visible) => !visible)}
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </button>
        <div className={`${showFilters ? "block" : "hidden"} space-y-8 lg:block`}>
        {/* Rating */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-xl font-bold tracking-wider sm:text-2xl">
            {CUSTOMER_RATING}
          </h1>
          <hr className="border-gray-500 w-3/4" />

          {[1, 2, 3, 4, 5].map((num, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 text-base font-semibold sm:text-xl"
            >
              <Input
                type="checkbox"
                value={num}
                checked={ratingNumber === num}
                onChange={() => handleRating(num)}
                className="scale-150"
              />
              <div className="flex space-x-2">
                <p className="text-gray-600">{"⭐".repeat(num)}</p>
                <p className="text-gray-600">{num} Above</p>
              </div>
            </div>
          ))}
        </div>

        {/* Discount */}
        <div className="flex flex-col space-y-4 mt-8">
          <h1 className="text-xl font-bold tracking-wider sm:text-2xl">{DISCOUNT}</h1>
          <hr className="border-gray-500 w-3/4" />

          {[10, 15, 20].map((num, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 text-base font-semibold sm:text-xl"
            >
              <Input
                type="checkbox"
                value={num}
                checked={discountNumber === num}
                onChange={() => handleDiscount(num)}
                className="scale-150"
              />
              <p className="text-gray-600">% {num} Above</p>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex flex-col space-y-4 mt-8">
          <h1 className="text-xl font-bold tracking-wider sm:text-2xl">{PRICE_RANGE}</h1>
          <hr className="border-gray-500 w-3/4" />

          {PRICE_RANGE_VALUES.map((num, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 text-base font-semibold sm:text-xl"
            >
              <Input
                type="checkbox"
                value={index}
                checked={priceNumber === index}
                onChange={() => handlePriceRange(index)}
                className="scale-150"
              />
              <span className="text-gray-600">
                {num.max === Infinity
                  ? `₹ ${num.min}`
                  : `₹ ${num.min} - ₹ ${num.max}`}
              </span>
            </div>
          ))}
        </div>

        {/* Category */}
        <div className="flex flex-col space-y-4 mt-8">
          <h1 className="font-bold text-2xl tracking-wider">
            {CATEGORY.toUpperCase()}
          </h1>
          <hr className="border-gray-500" />

          {categoryCountMap.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 text-base font-semibold sm:text-xl"
            >
              <Input
                type="checkbox"
                value={index}
                checked={categroyfilter === index}
                onChange={() => handleCategory(index)}
                className="scale-150"
              />
              <div className="flex space-x-4 text-gray-600">
                <span>{Capitalize(item[0])}</span>
                <span>:</span>
                <span>{`(${item[1]})`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </aside>

      {/* Right Side */}
      <div className="min-h-screen w-full min-w-0 pt-2 lg:w-3/4 lg:pt-4">
        <div className="m-2 grid grid-cols-2 sm:m-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {ProductsData.length ? (
            ProductsData.map((item, key) => (
              <ProductTile
                key={item.id}
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
                {ratingNumber || discountNumber || priceNumber || categroyfilter
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
