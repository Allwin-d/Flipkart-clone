import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import type { CartItem } from "../Types/ApiResponse";
import { useContext, useState } from "react";
import BuyAndCart from "../components/BuyAndCart";
import RatingAndStock from "../components/Ratings";
import PriceSection from "../components/PriceSection";
import AdditionalInformation from "../components/AdditionalInformation";
import Comments from "../components/Comments";
import { Context } from "../Context/ContextProvider";
import ProductTile from "../components/ProductTile";
import {
  ERROR_MESSAGE,
  LOADING_MESSAGE,
  NOIMAGE,
  SIMILAR_PRODUCTS,
} from "../Constants/Constants";

const ProductDetails = () => {
  const [activeImg, setActiveImg] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const [searchParams] = useSearchParams();
  console.log("useSearchParams:", searchParams.get("category"));

  const context = useContext(Context);
  console.log("Context Data : ", context);

  const location = useLocation();
  console.log("useLocation:", location);

  const { id } = useParams();
  console.log("Product ID:", id);

  const SingleProductApi = import.meta.env.VITE_SINGLE_PRODUCT_API;
  const fetchSingleProduct = async (): Promise<CartItem> => {
    const res = await axios.get<CartItem>(`${SingleProductApi}${id}`);
    return res.data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["SingleProduct", id],
    queryFn: fetchSingleProduct,
    enabled: !!id, //here it means that if the id is true , the api call will happen, otherwise it won't , -> it return boolean value
  });

  const SimilarProducts = context?.data?.products?.filter(
    (item) => item.category === data?.category && item.id !== data?.id,
  );

  console.log("Similar Products : ", SimilarProducts);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-600 text-4xl">{LOADING_MESSAGE}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-4xl">{ERROR_MESSAGE}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen my-4 w-full px-6">
      <div className="my-4 flex w-full px-6">
        {/* 🔹 Main Flex Container */}
        <div className="flex justify-start items-start w-full">
          {/* 🔹 Left Section (Thumbnails + Image) */}
          <div className="flex flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex flex-col">
              {data?.images?.length ? (
                data.images.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    onClick={() => setActiveImg(index)}
                    className={
                      activeImg === index
                        ? "w-[200px] h-[200px] cursor-pointer border-4 border-blue-500 rounded-lg bg-gray-100"
                        : "w-[200px] h-[200px] cursor-pointer border-2"
                    }
                  />
                ))
              ) : (
                <p>{NOIMAGE}</p>
              )}
            </div>

            {/* Main Image + Buttons */}
            <div className="flex flex-col">
              <img
                src={data?.images?.[activeImg]}
                className="w-[700px] h-[700px] bg-gray-100"
              />
              {data && <BuyAndCart prod={data} />}
            </div>
          </div>

          {/* 🔹 Right Section (Product Details) */}
          <div className="flex flex-col space-y-8 ml-20">
            <p className="font-bold text-gray-500 text-xl">
              {data?.category?.toUpperCase()}
            </p>
            <p className="text-blue-600 font-bold text-2xl">
              {data?.brand?.toUpperCase()}
            </p>
            <p className="text-black font-bold text-xl w-3/4 leading-8">
              {data?.description}
            </p>
            <RatingAndStock
              rating={averageRating}
              NoOfRatings={reviewsCount}
              stocks={data?.stock}
            />
            <hr></hr>
            <PriceSection
              FixedPrice={data?.price}
              discountPercentage={data?.discountPercentage}
            />
            <hr></hr>
            <AdditionalInformation
              Category={data ? data.category : ""}
              Sku={data ? data.sku : ""}
              Stock={data ? data.stock : 0}
              MinimumOrderQuantity={data ? data.minimumOrderQuantity : 0}
              WarrantyInformation={data ? data.warrantyInformation : ""}
              ShippingInformation={data?.shippingInformation || ""}
              ReturnPolicy={data ? data.returnPolicy : ""}
            />
          </div>
        </div>
      </div>

      {/*Similar Products section*/}
      <div className="flex flex-col m-8 w-full">
        <h1 className="text-2xl font-bold">{SIMILAR_PRODUCTS}</h1>
        <div className="flex flex-row overflow-x-auto justify-around items-center scrollbar-hide ">
          {SimilarProducts?.map((item, index) => (
            <ProductTile
              id={item.id}
              index={index}
              images={item.images[0]}
              title={item.title}
              brand={item.brand ?? ""}
              price={item.price}
              discountPercentage={item.discountPercentage}
            ></ProductTile>
          ))}
        </div>
      </div>

      {/* Comment Section */}
      <Comments
        productId={id ? id : ""}
        reviewsCount={setReviewsCount} //here we are passing the setter function to the child component , and in the child component we update value and pass it to parent component
        averageRating={setAverageRating} //same as previous line
      />
    </div>
  );
};

export default ProductDetails;
