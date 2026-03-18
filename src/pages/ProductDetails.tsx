import type { Product } from "../Types/ApiResponse";

type ProductType = {
  data: Product[];
  title: string;
};

const ProductDetails = ({ data, title }: ProductType) => {
  console.log("Data : ", data);
  return (
    <div className="m-6">
      <div className="flex flex-col space-y-4">
        <p className="text-4xl font-bold">{title}</p>
        <div className=" flex flex-row justify-around items-center gap-5">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center hover:scale-105 transition-all duration-150 cursor-pointer"
            >
              <img
                src={item.images[0]}
                className="w-[200px] h-[200px] object-contain"
              ></img>
              <p className="font-bold text-xl ">{item.title}</p>
              <p className="text-xl">{item.brand}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
