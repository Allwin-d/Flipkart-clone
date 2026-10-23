import {
  CATEGORY,
  MINIMUM_ORDER_QUANTITY,
  RETURN_POLICY,
  SHIPPING_INFORMATION,
  SKU,
  SPECIFICATION,
  STOCK,
  WARRANTY_INFORMATION,
} from "../../Constants/ConstantVariables/constantsVariables";
import type { AdditionalInformationProps } from "./additionalInformation.types";
import { Capitalize } from "../../utils/utilityFunctions";

const AdditionalInformation = ({
  Category,
  Sku,
  Stock,
  MinimumOrderQuantity,
  WarrantyInformation,
  ShippingInformation,
  ReturnPolicy,
}: AdditionalInformationProps) => {
  return (
    <div className="flex flex-col space-y-3 sm:space-y-4">
      <h1 className="text-2xl font-bold text-black sm:text-3xl">{SPECIFICATION}</h1>
      <hr className="w-1/4"></hr>
      <div className="flex flex-col gap-1 text-base sm:flex-row sm:space-x-4 sm:text-xl lg:text-2xl">
        <p className="text-gray-400 font-bold">{CATEGORY}</p>
        <p className="font-medium">{Capitalize(Category)}</p>
      </div>
      <div className="flex flex-col gap-1 text-base sm:flex-row sm:space-x-4 sm:text-xl lg:text-2xl">
        <p className="text-gray-400 font-bold">{SKU}</p>
        <p className="font-medium">{Sku}</p>
      </div>
      <div className="flex flex-col gap-1 text-base sm:flex-row sm:space-x-4 sm:text-xl lg:text-2xl">
        <p className="text-gray-400 font-bold">{STOCK}</p>
        <p className="font-medium">{Stock}</p>
      </div>
      <div className="flex flex-col gap-1 text-base sm:flex-row sm:space-x-4 sm:text-xl lg:text-2xl">
        <p className="text-gray-400 font-bold">{MINIMUM_ORDER_QUANTITY}</p>
        <p className="font-medium">{MinimumOrderQuantity}</p>
      </div>
      <div className="flex flex-col gap-1 text-base sm:flex-row sm:space-x-4 sm:text-xl lg:text-2xl">
        <p className="text-gray-400 font-bold">{SHIPPING_INFORMATION}</p>
        <p className="font-medium">{ShippingInformation}</p>
      </div>
      <div className="flex flex-col gap-1 text-base sm:flex-row sm:space-x-4 sm:text-xl lg:text-2xl">
        <p className="text-gray-400 font-bold">{WARRANTY_INFORMATION}</p>
        <p className="font-medium">{WarrantyInformation}</p>
      </div>
      <div className="flex flex-col gap-1 text-base sm:flex-row sm:space-x-4 sm:text-xl lg:text-2xl">
        <p className="text-gray-400 font-bold">{RETURN_POLICY}</p>
        <p className="font-medium">{ReturnPolicy}</p>
      </div>
    </div>
  );
};

export default AdditionalInformation;
