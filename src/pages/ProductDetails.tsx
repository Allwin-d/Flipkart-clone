import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { useLocation, useSearchParams } from "react-router-dom";
import type { CartItem } from "../Types/ApiResponse";
import { useContext, useState } from "react";
import BuyAndCart from "../components/BuyAndCart/BuyAndCart";
import RatingAndStock from "../components/Ratings/Ratings";
import PriceSection from "../components/PriceSection/PriceSection";
import AdditionalInformation from "../components/AdditionalInformation/AdditionalInformation";
import Comments from "../components/Comments/Comments";
import { Context } from "../Context/ContextProvider";
import ProductTile from "../components/ProductTile/ProductTile";
import {
  ERROR_MESSAGE,
  LOADING_MESSAGE,
  NOIMAGE,
  SIMILAR_PRODUCTS,
} from "../Constants/ConstantVariables/constantsVariables";

const ProductDetails = () => {
  const [activeImg, setActiveImg] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  // const [searchParams] = useSearchParams();
  // console.log("useSearchParams:", searchParams.get("category"));
  // URL la irukkura query params-a handle pannum like /products?category=chicken&page=2 , we can get the CATEGORY AND PAGE by using get method it provides

  const context = useContext(Context);

  // const location = useLocation();
  // console.log("useLocation:", location);
  //ippa user enga irukkaan (URL details) nu therinjikkanum na useLocation use pannuvom it
  //`pathname` current route (`/home`), `search` query params (`?id=10`), `hash` `#section` part.

  const { id } = useParams();

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
    <div className="my-4 flex min-h-screen w-full flex-col px-3 sm:px-6">
    <div className="my-4 flex w-full">
        {/* 🔹 Main Flex Container */}
      <div className="flex w-full flex-col items-start gap-8 lg:flex-row">
          {/* 🔹 Left Section (Thumbnails + Image) */}
        <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:gap-4 lg:w-1/2">
            {/* Thumbnails */}
          <div className="flex max-w-full flex-row gap-2 overflow-x-auto sm:max-h-[min(70vw,700px)] sm:flex-col sm:overflow-y-auto sm:overflow-x-hidden">
              {data?.images?.length ? (
                data.images.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                  alt={`${data.title} image ${index + 1}`}
                  onClick={() => setActiveImg(index)}
                  className={
                    activeImg === index
                      ? "h-16 w-16 shrink-0 cursor-pointer rounded-lg border-4 border-blue-500 bg-gray-100 object-contain sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                      : "h-16 w-16 shrink-0 cursor-pointer border-2 object-contain sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                  }
                />
                ))
              ) : (
                <p>{NOIMAGE}</p>
              )}
            </div>

            {/* Main Image + Buttons */}
            <div className="flex min-w-0 flex-1 flex-col">
              <img
                src={data?.images?.[activeImg]}
                alt={data?.title}
                className="h-[min(100vw,480px)] w-full rounded-lg bg-gray-100 object-contain sm:h-[min(70vw,600px)] lg:h-[min(50vw,700px)]"
              />
              {data && (
                <BuyAndCart prod={data} available={data.availabilityStatus} />
              )}
            </div>
          </div>

          {/* 🔹 Right Section (Product Details) */}
          <div className="flex w-full min-w-0 flex-col space-y-5 sm:space-y-7 lg:w-1/2 lg:space-y-8 lg:pl-8">
            <p className="font-bold text-gray-500 text-xl">
              {data?.category?.toUpperCase()}
            </p>
            <p className="text-blue-600 font-bold text-2xl">
              {data?.brand?.toUpperCase()}
            </p>
            <p className="w-full text-base font-bold leading-7 text-black sm:text-xl sm:leading-8">
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
      <div className="my-8 w-full">
        <h1 className="text-xl font-bold sm:text-2xl">{SIMILAR_PRODUCTS}</h1>
        <div className="flex items-center overflow-x-auto scrollbar-hide">
          {SimilarProducts?.map((item, index) => (
            <ProductTile
              key={item.id}
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
        productId={id ?? ""}
        reviewsCount={setReviewsCount} //here we are passing the setter function to the child component , and in the child component we update value and pass it to parent component
        averageRating={setAverageRating} //same as previous line
      />
    </div>
  );
};

export default ProductDetails;
