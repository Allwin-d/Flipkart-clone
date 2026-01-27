import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../Types/ApiResponse";
import { currConveter } from "../utils/CurrConveter";
import { useDispatch } from "react-redux";
import { addToCart } from "../Slices/CartSlice";

const ProductDetails = () => {
  const [data, setData] = useState<Product | null>(null);
  const { id } = useParams();
  const SINGLE_PRODUCTAPIURL = import.meta.env.VITE_SINGLE_PRODUCT_API;
  const dispatch = useDispatch();

  console.log("This is the id from the Product Details page : ", id);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `${SINGLE_PRODUCTAPIURL}${id}`,
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSingleProduct();
  }, [id, SINGLE_PRODUCTAPIURL]);

  console.log("Single Product Data: ", data);

  const handleAddToCart = (item: Product) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex " key={data?.id}>
      {/* Left Sidebar */}
      <div className="w-2/5 flex flex-col items-center justify-center bg-white space-y-16">
        <img
          src={data?.images[0]}
          alt={data?.title}
          className="w-96 object-contain bg-gray-200 h-[32rem]"
        />
        <div className="w-full flex items-center justify-evenly mt-4">
          <button
            className="rounded-md px-8 py-2 text-white bg-orange-400 text-2xl hover:bg-orange-600 transition duration-150"
            onClick={() => data && handleAddToCart(data)}
          >
            Add to Cart
          </button>

          <button className="rounded-md px-8 py-2 text-white bg-orange-600 text-2xl hover:bg-orange-900 transition duration-150">
            Buy Now
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-3/5 flex flex-col justify-center bg-white pl-10 space-y-14">
        <p className="font-bold text-3xl ">{data?.category.toUpperCase()}</p>
        <p className="text-2xl font-md">{data?.title}</p>
        <p className="text-xl font-sm w-3/4 leading-8 ">{data?.description}</p>
        <p className="text-2xl ">{data?.rating}⭐</p>
        <p className="text-2xl">
          {`${currConveter(Number(data?.price.toFixed(1)))}`}
        </p>
        <p className="text-2xl">{data?.discountPercentage} % Discount </p>
        <p className="text-2xl">Only {data?.stock} Left</p>
      </div>
    </div>
  );
};

export default ProductDetails;
