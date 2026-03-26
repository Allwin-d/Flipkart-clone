type AdditionalInformationProps = {
  Category: string;
  Sku: string;
  Stock: number | string;
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
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row space-x-4 ">
        <p className="text-gray-400 font-bold">Category</p>
        <p className="font-medium">{Category}</p>
      </div>
      <div className="flex flex-row space-x-4">
        <p className="text-gray-400 font-bold">Sku</p>
        <p className="font-medium">{Sku}</p>
      </div>
      <div className="flex flex-row space-x-4">
        <p className="text-gray-400 font-bold">Mininum Order Quantity</p>
        <p className="font-medium">{Stock}</p>
      </div>
      <div className="flex flex-row space-x-4">
        <p className="text-gray-400 font-bold">Warranty Information</p>
        <p className="font-medium">{MinimumOrderQuantity}</p>
      </div>
      <div className="flex flex-row space-x-4">
        <p className="text-gray-400 font-bold">Shipping Information</p>
        <p className="font-medium">{ShippingInformation}</p>
      </div>
      <div className="flex flex-row space-x-4">
        <p className="text-gray-400 font-bold">Warranty Information</p>
        <p className="font-medium">{WarrantyInformation}</p>
      </div>
      <div className="flex flex-row space-x-4">
        <p className="text-gray-400 font-bold">Return Policy</p>
        <p className="font-medium">{ReturnPolicy}</p>
      </div>
    </div>
  );
};

export default AdditionalInformation;
