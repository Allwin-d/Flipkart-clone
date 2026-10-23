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
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-6">
      <p className="text-2xl text-black sm:text-3xl">
        ₹ {CurrencyConverter(FixedPrice ? FixedPrice : 0)}
      </p>
      <p className="text-lg text-gray-500 line-through sm:text-2xl">
        ₹
        {getOriginalPrice(
          CurrencyConverter(FixedPrice ? FixedPrice : 0),
          discountPercentage ? discountPercentage : 0,
        )}
      </p>
      <p className="text-base text-green-700 sm:text-xl">
        {Math.floor(discountPercentage ?? 0)} {DISCOUNT_PERCENTAGE}
      </p>
    </div>
  );
};

export default PriceSection;
