import ProductCart from "../components/ProductCart";
import type { RootState } from "../Store/store";
import { useSelector } from "react-redux";
import type { Product } from "../Types/ApiResponse";
import PriceDetails from "../components/PriceDetails";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart);

  return (
    <div className="w-full min-h-screen bg-gray-100 py-6">
      {cartItems.length > 0 ? (
        <div className="max-w-7xl mx-auto flex gap-6 px-4">
          {/* LEFT SIDE - Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {cartItems.map((item: Product) => (
              <ProductCart
                key={item.id}
                id={item.id}
                title={item.title}
                brand={item.brand}
                img={item.images?.[0]}
                price={item.price}
                discount={item.discountPercentage}
                description={item.description}
              />
            ))}
          </div>

          {/* RIGHT SIDE - Price Section (you will implement) */}
          <div className="w-[320px] shrink-0">
            <PriceDetails />
          </div>
        </div>
      ) : (
        <p className="w-full min-h-screen flex items-center justify-center text-center text-2xl text-gray-500">
          No Products Added, Please Add Products To Cart ...
        </p>
      )}
    </div>
  );
};

export default Cart;
