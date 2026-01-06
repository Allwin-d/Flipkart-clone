import { useDispatch } from "react-redux";
import { CurrConverter } from "../utils/CurrConveter";
import { removeFromCart } from "../Slices/CartSlice";

type ProductCartProp = {
  id: number;
  title: string;
  brand: string;
  img: string;
  price: number;
  discount: number;
  description: string;
};

const ProductCart = ({
  id,
  title,
  brand,
  img,
  price,
  discount,
  description,
}: ProductCartProp) => {

    const dispatch = useDispatch();

    function handleRemove(id:number){
        dispatch(removeFromCart(id));
    }


  return (
    <div className="flex flex-row w-full space-x-7" key={id}>
      {/* This is for the image section  */}
      <div className="float-left">
        <img src={img} alt={title} className="w-80 h-60" />
      </div>

      {/* This is for the product details section  */}
      <div className="float-right">
        <div className="flex flex-col space-y-4 mt-14">
          <p>{description}</p>
          <p>{brand}</p>
          <p>{title}</p>
          <div className="flex flex-row space-x-4">
            <p>Discount Percentage : {discount}</p>
            <p>{CurrConverter(price)}</p>
          </div>
          <button onClick={()=>handleRemove(id)} className="text-white bg-red-600 hover:bg-red-800 transition-all duration-200 rounded-lg w-28 py-2">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
