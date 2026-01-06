import type { RootState } from "../Store/store"; // adjust path if needed
import { CurrConverter } from "../utils/CurrConveter";
import { useSelector } from "react-redux";

const PriceDetails = () => {
  const PriceDetails = useSelector((state: RootState) => state.cart);

  const TotalPrice = PriceDetails.reduce(
    (acc, val) => (acc = acc + val.price),
    0
  );

  const TotalDiscountPercentage = PriceDetails.reduce(
    (acc, val) => (acc = acc + val.discountPercentage),
    0
  );

  const DisCountAmount = TotalPrice * (TotalDiscountPercentage / 100);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2">
        <p>Price({PriceDetails.length}items)</p>
        <p>Total Price : {CurrConverter(TotalPrice)}</p>
      </div>
      <div className="flex flex-row">
        <p>Discount</p>
        <p>{DisCountAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};
export default PriceDetails;
