type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  return <div>{"⭐️".repeat(rating)}</div>;
};

export default Rating;
