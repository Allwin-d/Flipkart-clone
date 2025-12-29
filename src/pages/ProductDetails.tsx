import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { Product } from "../Types/ApiResponse";
import { CurrConverter } from "../utils/CurrConveter";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const SingleProdApi = import.meta.env.VITE_SINGLE_PRODUCT_API;

  const fetchSingle = async () => {
    const response = await axios.get(`${SingleProdApi}${id}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ["SingleProduct", id],
    queryFn: fetchSingle,
    enabled: !!id, // only fetch if id exists
  });

  if (!id) {
    return <div>Invalid product ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load product</div>;
  }

  return (
    <div className="max-w-full max-h-full ">
      {/* This is for the Pic left side  */}
      <div className="w-full flex flex-row justify-around items-center h-[900px]">
        <section className="float-left">
          <img
            src={data?.images[0]}
            alt={data?.title}
            className="w-full h-96"
          ></img>
          <section className="flex flex-row justify-center items-center space-x-9 mt-16">
            <button className="text-md rounded-md text-white bg-yellow-500 px-8 py-4  cursor-pointer  hover:bg-yellow-700">
              Add To Cart{" "}
            </button>
            <button className="text-md rounded-md text-white bg-orange-500 px-8 py-4 cursor-pointer hover:bg-orange-700">
              Buy Now
            </button>
          </section>
        </section>
        <section className="float-right mt-8 space-y-14">
          <p className="text-4xl font-sans ">{data?.brand}</p>
          <p className="text-xl font-sans ">{data?.title}</p>
          <p className="text-xl font-bold leading-10 ">{data?.description}</p>
          <p className="text-xl font-sans  text-white bg-green-700 w-32 text-center rounded-lg py-2">
            Rating {data?.rating}
          </p>
          <p className="text-xl font-sans bg-gray-500 w-40 py-2 text-center rounded-lg text-white  ">Category {data?.category}</p>
          <p className="text-xl font-sans font-bold">
            Price :₹ {CurrConverter(data?.price)}
          </p>
          <p className="text-2xl">Discount : {data?.discountPercentage} % </p>
          <p className="text-2xl text-blue-600">
            Warranty {data?.warrantyInformation}
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
