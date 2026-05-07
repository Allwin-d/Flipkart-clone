import { UNAVAILABLE } from "../../Constants/ConstantVariables/constantsVariables";
import type { RatingsProps } from "./ratings.types";
const RatingAndStock = ({ rating, NoOfRatings, stocks }: RatingsProps) => {
  return (
    <div className="flex flex-row space-x-6 items-center">
      <p className="text-white bg-green-700 px-4 py-2 rounded-lg font-bold cursor-pointer">
        ⭐ {rating}
      </p>
      <p className="text-gray-400 cursor-pointer font-bold">
        {(NoOfRatings ?? 0) <= 1
          ? `${NoOfRatings} Rating`
          : `${NoOfRatings} Ratings`}
      </p>
      <p
        className={
          stocks
            ? "bg-green-300 text-green-900 px-2 py-2 rounded-lg font-medium cursor-pointer"
            : "bg-red-300 text-red-800 px-2 py-2 rounded-lg font-medium cursor-pointer"
        }
      >
        {stocks ? `✔️ InStock ` : `${UNAVAILABLE}`}
      </p>
    </div>
  );
};

export default RatingAndStock;
