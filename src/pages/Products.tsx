import { useLocation, useNavigate } from "react-router-dom";
import type { Product } from "../Types/ApiResponse";
import { currConveter } from "../utils/utilityFunctions";
import { useMemo, useState } from "react";

const Products = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safe fallback if state is undefined
  const products = useMemo<Product[]>(() => {
    return state || [];
  }, [state]);

  const [sortType, setSortType] = useState<"low" | "high" | null>(null); //This is the union type 

  const handleClick = (val: number) => {
    navigate(`/productDetails/${val}`);
  };

  // Memoized sorting (BEST PRACTICE)
  const sortedData = useMemo(() => {
    if (!sortType) return products; //if there is no sortType is triggered then the default products is returned 

    const copy = [...products];   //here we are copying it  ,because sorting mutates the original array 

    if (sortType === "low") {
      return copy.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high") {
      return copy.sort((a, b) => b.price - a.price);
    }

    return copy;
  }, [products, sortType]);

  return sortedData.length > 0 ? (
    <div className="flex">
      {/* Sidebar */}
      <div className="flex flex-col fixed bg-red-300 w-56 h-screen items-center pt-40 space-y-4">
        <p className="text-2xl font-bold">Price Filter</p>

        <div className="flex space-x-2">
          <input
            type="checkbox"
            checked={sortType === "low"}
            onChange={() => setSortType(sortType === "low" ? null : "low")}
          />
          <p className="text-xl">Low to High</p>
        </div>

        <div className="flex space-x-2">
          <input
            type="checkbox"
            checked={sortType === "high"}
            onChange={() => setSortType(sortType === "high" ? null : "high")}
          />
          <p className="text-xl">High to Low</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-4 items-center mx-16 pb-10 ml-72">
        {sortedData.map((item) => (
          <div key={item.id} className="flex flex-col space-y-3">
            <img
              className="w-64 h-64 cursor-pointer hover:scale-110 transition duration-100 ease-in"
              src={item.images[0]}
              alt={item.title}
              onClick={() => handleClick(item.id)}
            />

            <p>{item.description}</p>
            <p>{item.title}</p>

            <p className="text-white bg-green-600 w-fit rounded-md px-3 py-1">
              Rating : {item.rating}
            </p>

            <p className="mr-14 font-bold text-xl">
              {currConveter(item.price)}
              <span className="ml-10">{item.discountPercentage}% off</span>
            </p>

            <p className="text-red-600 w-fit rounded-md px-3 py-1 text-xl">
              {item.stock} Remaining
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-red-600 text-3xl">
        Try Searching with the Different Word
      </p>
    </div>
  );
};

export default Products;
