import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ApiResponse } from "../Types/ApiResponse";
import { CurrConverter } from "../utils/CurrConveter";

const Home = () => {
  const API_URL = import.meta.env.VITE_PRODUCTS_API;
  console.log("import.meta.env", API_URL);

  const fetchProducts = async () => {
    const data = await axios.get<ApiResponse>(API_URL);
    return data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: fetchProducts,
    // refetchInterval : we use this because after the specific time , it will refetch the data from the server , for eg :in the weather app , the weather updates for like every sec
  });

  console.log("Data : ", data?.data.products);

  const categories = new Set(data?.data.products.map((item) => item.category));
  console.log("Categories ", categories); //this are the different categories for the products

  const beautyProducts = data?.data.products.filter(
    (item) => item.category === "beauty"
  );
  console.log("beautyProducts: ", beautyProducts);

  const Fragrances = data?.data.products.filter(
    (item) => item.category === "fragrances"
  );
  console.log("Fragrances: ", Fragrances);

  const Laptops = data?.data.products.filter(
    (item) => item.category === "laptops"
  );
  console.log("Laptops: ", Laptops);

  const smartPhones = data?.data.products
    .filter((item) => item.category === "smartphones")
    .slice(0, 5);
  console.log("SmartPhones : ", smartPhones);

  const mensShirts = data?.data.products.filter(
    (item) => item.category === "mens-shirts"
  );
  console.log("Mens Shirts : ", mensShirts);

  const womansDresses = data?.data.products
    .filter((item) => item.category === "womens-dresses")
    .slice(0, 5);

  console.log("Womans Dresses : ", womansDresses);

  if (isLoading) {
    return (
      <div>
        <p>Loading ....</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Failed to fetch Data ....</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full justify-center items-center flex flex-col space-y-16 bg-gray-50  pt-4 pb-6">
      {/* This is for the Beauty Section  */}

      <div className="flex flex-row space-x-10 ">
        {" "}
        <h1 className="text-2xl flex items-center justify-center ">
          Beauty Products{" "}
        </h1>
        <div className="flex flex-row space-x-40 items-center">
          {beautyProducts?.map((item) => (
            <div className="flex flex-col space-y-3 cursor-pointer hover:scale-110 transition-transform text-center">
              <img src={item.images[0]} width={190} height={170}></img>
              <p>{item.title}</p>
              <span>₹{CurrConverter(item.price)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* This is for the Fragrance Section  */}
      <div className="flex flex-row space-x-10">
        <h1 className="text-2xl flex items-center justify-center">
          Fragrances
        </h1>
        <div className="flex flex-row space-x-40 items-center">
          {Fragrances?.map((item) => (
            <div className="flex flex-col space-y-3 cursor-pointer hover:scale-110 transition-transform text-center">
              <img src={item.images[0]} width={190} height={170}></img>
              <p>{item.title}</p>
              <span>₹{CurrConverter(item.price)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* This is for the Laptops section  */}
      <div className="flex flex-row space-x-10">
        <h1 className="text-2xl flex items-center justify-center"> Laptops</h1>
        <div className="flex flex-row space-x-40 items-center">
          {Laptops?.map((item) => (
            <div className="flex flex-col space-y-3 cursor-pointer hover:scale-110 transition-transform text-center">
              <img src={item.images[0]} width={190} height={170}></img>
              <p>{item.title}</p>
              <span>₹{CurrConverter(item.price)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* This is for Mobiles Section  */}
      <div className="flex flex-row space-x-10">
        <h1 className="text-2xl flex items-center justify-center"> Mobiles</h1>
        <div className="flex flex-row space-x-40 items-center">
          {smartPhones?.map((item) => (
            <div className="flex flex-col space-y-3 cursor-pointer hover:scale-110 transition-transform text-center">
              <img src={item.images[0]} width={190} height={170}></img>
              <p>{item.title}</p>
              <span>₹{CurrConverter(item.price)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* This is for the Men's Shirts  */}
      <div className="flex flex-row space-x-10">
        <h1 className="text-2xl flex items-center justify-center">
          Men's Shirts{" "}
        </h1>
        <div className="flex flex-row space-x-40 items-center justify-center">
          {mensShirts?.map((item) => (
            <div className="flex flex-col space-y-3 cursor-pointer hover:scale-110 transition-transform text-center">
              <img src={item.images[0]} width={190} height={170}></img>
              <p className="">{item.title}</p>
              <span>₹{CurrConverter(item.price)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* This is for the Women's Dress */}
      <div className="flex flex-row space-x-10">
        <h1 className="text-2xl flex items-center justify-center">
          {" "}
          Women's Dress
        </h1>
        <div className="flex flex-row space-x-40 items-center">
          {womansDresses?.map((item) => (
            <div className="flex flex-col space-y-3 cursor-pointer hover:scale-110 transition-transform text-center">
              <img src={item.images[0]} width={190} height={170}></img>
              <p>{item.title}</p>
              <span>₹{CurrConverter(item.price)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
