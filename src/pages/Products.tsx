import { useLocation } from "react-router-dom";
import type { Product } from "../Types/ApiResponse";
import { currConveter } from "../utils/utilityFunctions";

const Products = () => {
  const { state } = useLocation(); //here we are getting the value from the navigate state
  console.log("State from the products Page : ", state);
  const data: Product[] = [...state];

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 items-center mx-16 pb-10">
        {data.map((item) => (
          <div className="flex flex-col space-y-3">
            <img
              className="w-64 h-64"
              src={item.images[0]}
              alt={item.title}
            ></img>
            <p>{item.description}</p>
            <p key={item.id} className="col-span-1">
              {item.title}
            </p>
            <p className="text-white bg-green-600 w-fit rounded-md px-3 py-1 ">
              Rating : {item.rating}
            </p>
            <p className="mr-14 font-bold text-xl">
              {currConveter(item.price)}{" "}
              <span className="ml-10">{item.discountPercentage}% off</span>
            </p>
            <p className="text-red-600 bg-gray-200 w-fit rounded-md px-3 py-1">
              {item.stock} Remaining
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
