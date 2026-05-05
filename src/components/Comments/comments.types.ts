export type CommentsProps = {
  productId: string;
  reviewsCount: (count: number) => void;
  averageRating: (count: number) => void;
};
