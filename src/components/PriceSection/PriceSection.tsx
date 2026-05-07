import { DISCOUNT_PERCENTAGE } from "../../Constants/ConstantVariables/constantsVariables";
import {
  CurrencyConverter,
  getOriginalPrice,
} from "../../utils/utilityFunctions";
import type { PriceSectionProps } from "./priceSection.types";

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
        {getOriginalPrice(
          CurrencyConverter(FixedPrice ? FixedPrice : 0),
          discountPercentage ? discountPercentage : 0,
        )}
      </p>
      <p className="text-green-700 text-xl">
        {Math.floor(discountPercentage ?? 0)} {DISCOUNT_PERCENTAGE}
      </p>
    </div>
  );
};

export default PriceSection;
