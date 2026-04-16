import {
  CATEGORY,
  MINIMUM_ORDER_QUANTITY,
  RETURN_POLICY,
  SHIPPING_INFORMATION,
  SKU,
  SPECIFICATION,
  STOCK,
  WARRANTY_INFORMATION,
} from "../Constants/Constants";
import { Capitalize } from "../utils/utilityFunctions";

type AdditionalInformationProps = {
  Category: string;
  Sku: string;
  Stock: number;
  MinimumOrderQuantity: number;
  WarrantyInformation: string;
  ShippingInformation: string;
  ReturnPolicy: string;
};

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
    <div className="flex flex-col space-y-4">
      <h1 className="text-3xl text-black font-bold">{SPECIFICATION}</h1>
      <hr className="w-1/4"></hr>
      <div className="flex flex-row space-x-4 text-2xl ">
        <p className="text-gray-400 font-bold">{CATEGORY}</p>
        <p className="font-medium">{Capitalize(Category)}</p>
      </div>
      <div className="flex flex-row space-x-4 text-2xl">
        <p className="text-gray-400 font-bold">{SKU}</p>
        <p className="font-medium">{Sku}</p>
      </div>
      <div className="flex flex-row space-x-4 text-2xl">
        <p className="text-gray-400 font-bold">{STOCK}</p>
        <p className="font-medium">{Stock}</p>
      </div>
      <div className="flex flex-row space-x-4 text-2xl">
        <p className="text-gray-400 font-bold">{MINIMUM_ORDER_QUANTITY}</p>
        <p className="font-medium">{MinimumOrderQuantity}</p>
      </div>
      <div className="flex flex-row space-x-4 text-2xl">
        <p className="text-gray-400 font-bold">{SHIPPING_INFORMATION}</p>
        <p className="font-medium">{ShippingInformation}</p>
      </div>
      <div className="flex flex-row space-x-4 text-2xl">
        <p className="text-gray-400 font-bold">{WARRANTY_INFORMATION}</p>
        <p className="font-medium">{WarrantyInformation}</p>
      </div>
      <div className="flex flex-row space-x-4 text-2xl">
        <p className="text-gray-400 font-bold">{RETURN_POLICY}</p>
        <p className="font-medium">{ReturnPolicy}</p>
      </div>
    </div>
  );
};

export default AdditionalInformation;
