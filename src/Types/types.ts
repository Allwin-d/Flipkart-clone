type product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];

  brand: string;
  sku: string;
  weight:number,
  dimensions: dimension;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: met;
  images: string[];
  thumbnail: string;
};
type met = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};
type dimension = {
  width: number;
  height: number;
  depth: number;
};
type review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type products = product[];