type RatingsProps = {
  rating?: number;
  NoOfRatings?: number;
  stocks?: number;
};

const RatingAndStock = ({ rating, NoOfRatings, stocks }: RatingsProps) => {
  return (
    <div className="flex flex-row space-x-6 items-center">
      <p className="text-white bg-green-700 px-8 py-2 rounded-lg font-bold cursor-pointer">
        ⭐ {rating}
      </p>
      <p className="text-gray-400 cursor-pointer font-bold">
        {NoOfRatings} Ratings
      </p>
      <p
        className={
          stocks
            ? "bg-green-300 text-green-900 px-8 py-2 rounded-lg font-bold cursor-pointer"
            : "bg-red-300 text-red-800 px-8 py-2 rounded-lg font-bold cursor-pointer"
        }
      >
        {stocks ? `✔️ InStock (only ${stocks} Available) ` : "❌ UnAvailable"}
      </p>
    </div>
  );
};

export default RatingAndStock;
