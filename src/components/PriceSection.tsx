import { CurrencyConverter } from "../utils/utilityFunctions";
import { OriginalPrice } from "../utils/utilityFunctions";

type PriceSectionProps = {
  FixedPrice?: number;
  discountPercentage?: number;
};

const PriceSection = ({
  FixedPrice,
  discountPercentage,
}: PriceSectionProps) => {
  return (
    <div className="flex flex-row space-x-6 items-center">
      <p className="text-black text-3xl ">
        ₹ {CurrencyConverter(FixedPrice ? FixedPrice : 0)}
      </p>
      <p className="text-gray-500 text-2xl line-through">
        ₹
        {OriginalPrice(
          CurrencyConverter(FixedPrice ? FixedPrice : 0),
          discountPercentage ? discountPercentage : 0,
        )}
      </p>
      <p className="text-green-700 text-xl">{discountPercentage} % off</p>
    </div>
  );
};

export default PriceSection;
