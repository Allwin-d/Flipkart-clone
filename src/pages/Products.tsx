import { useLocation, useNavigate } from "react-router-dom";
import type { Product } from "../Types/ApiResponse";
import { currConveter } from "../utils/utilityFunctions";

const Products = () => {
  const { state } = useLocation(); //here we are getting the value from the navigate state
  console.log("State from the products Page : ", state);
  const data: Product[] = [...state];
  const navigate = useNavigate();

  const handleClick = (val: number) => {
    navigate(`/productDetails/${val}`);
  };

  return data ? (
    data.length > 0 ? (
      <div>
        <div className="grid grid-cols-3 gap-4 items-center mx-16 pb-10 ">
          {data.map((item) => (
            <div className="flex flex-col space-y-3">
              <img
                className="w-64 h-64 cursor-pointer hover:scale-110 transition duration-100 ease-in"
                src={item.images[0]}
                alt={item.title}
                onClick={() => handleClick(item.id)}
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
              <p className="text-red-600 w-fit rounded-md px-3 py-1  text-xl">
                {item.stock} Remaining
              </p>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-600 text-3xl ">
          Try Searching with the Different Word{" "}
        </p>
      </div>
    )
  ) : null;
};

export default Products;
