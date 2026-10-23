import { UNAVAILABLE } from "../../Constants/ConstantVariables/constantsVariables";
import type { RatingsProps } from "./ratings.types";
const RatingAndStock = ({ rating, NoOfRatings, stocks }: RatingsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
      <p className="cursor-pointer rounded-lg bg-green-700 px-3 py-2 font-bold text-white sm:px-4">
        ⭐ {rating}
      </p>
      <p className="cursor-pointer text-sm font-bold text-gray-400 sm:text-base">
        {(NoOfRatings ?? 0) <= 1
          ? `${NoOfRatings} Rating`
          : `${NoOfRatings} Ratings`}
      </p>
      <p
        className={`text-sm sm:text-base ${
          stocks
            ? "cursor-pointer rounded-lg bg-green-300 px-2 py-2 font-medium text-green-900"
            : "cursor-pointer rounded-lg bg-red-300 px-2 py-2 font-medium text-red-800"
        }`}
      >
        {stocks ? `✔️ InStock ` : `${UNAVAILABLE}`}
      </p>
    </div>
  );
};

export default RatingAndStock;
