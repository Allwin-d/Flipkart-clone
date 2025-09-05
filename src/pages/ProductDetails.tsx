import { useLocation, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch } from "react-redux";
import type { CartItem } from "../Types/types";
import type { Review } from "../Types/types";
import { addtoCart } from "../Slices/CartSlice";

const ProductDetails = () => {
  const location = useLocation();
  console.log("PathName : ", location.pathname);
  console.log("State: ", location.state);
  console.log("Key :", location.key);

  // Safe destructuring with fallback
  const { item } = location.state || {};

  if (!item) {
    return <p>No product data found</p>;
  }

  const {
    brand,
    category,
    description,
    discountPercentage,
    id,
    images = [],
    price,
    rating,
    returnPolicy,
    reviews = [],
    shippingInformation,
    title,
    warrantyInformation,
  } = item;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAdd(val: CartItem) {
    console.log("Add to Cart is clicked", val);
    dispatch(addtoCart(val));
    navigate("/Cart");
  }

  return (
    <div key={id} className="mt-2 mb-2">
      <div className="w-full  ">
        <div className="flex items-center justify-center float-left w-1/2 p-2 pl-36 ">
          <div className="">
            {images.length > 0 ? (
              <div>
                <img
                  src={images[0]}
                  alt={title}
                  className="w-96 h-96 object-cover"
                />
              </div>
            ) : (
              <p>No Images for this product</p>
            )}

            <p className="w-2/4 leading-8 font-semibold text-xl ">
              {description}
            </p>
            <div className="flex flex-row gap-8  mt-10">
              <button
                className="w-40 bg-red-600 text-white rounded-lg py-2 hover:bg-red-800 transition duration-200"
                onClick={() => handleAdd(item)}
              >
                Add to Cart
              </button>
              <button className="w-40 bg-orange-500 text-white rounded-lg py-2 hover:bg-orange-800 transition duration-200">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center float-right w-1/2">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold">
              {title}
              <span>({brand})</span>
            </h1>
            <p className="font-semibold text-xl">Category: {category}</p>
            <p className="font-semibold text-xl">Rating: {rating}</p>
            <p className="font-semibold text-xl">
              Return Policy : {returnPolicy}
            </p>
            <p className="font-semibold text-xl">{shippingInformation}</p>
            <p className="font-semibold text-xl">{warrantyInformation}</p>
            <p className="text-2xl font-semibold p-1 bg-blue-600 w-60 rounded-lg text-white  hover:cursor-pointer hover:bg-blue-900 text-center">
              Price: ${price}
            </p>
            <p className="bg-green-600 w-60 rounded-full p-2 text-white text-center font-semibold hover:cursor-pointer hover:bg-green-900">
              {" "}
              Discount: {discountPercentage}%
            </p>

            <h2 className="text-xl font-semibold mt-4">Customer Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((review: Review, index: number) => (
                <div
                  key={index}
                  className="border p-3 rounded-md my-2 space-y-3"
                >
                  <p>
                    <strong>{review.reviewerName}</strong>{" "}
                    <Rating rating={review.rating} />
                  </p>
                  <p>{review.comment}</p>
                  <small className="text-gray-500">
                    {review.date} | {review.reviewerEmail}
                  </small>
                </div>
              ))
            ) : (
              <p>No Review for this Product</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
