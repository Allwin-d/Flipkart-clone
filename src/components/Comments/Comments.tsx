import { useEffect, useState } from "react";
import type { UserComment } from "../../Types/ApiResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "../Input/Input";
import axios from "axios";
import {
  COMMENT_FAILED,
  COMMENT_SUCCESS,
  COMMENTS_REVIEWS,
  FAILED_LOADING_COMMENTS,
  LOADING_COMMENTS,
  NO_COMMENTS,
  POST_COMMENT,
  RATING,
  WRITE_COMMENT,
} from "../../Constants/ConstantVariables/constantsVariables";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { fetchComment } from "../../api/comment";
import type { CommentsProps } from "./comments.types";

const Comments = ({
  productId,
  reviewsCount,
  averageRating,
}: CommentsProps) => {
  const [comment, setComment] = useState<UserComment>({
    UserName: "",
    Email: "",
    rating: 0,
    body: "",
  });

  const CommentsApi = import.meta.env.VITE_COMMENTS_BASE_URL;
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["Comments"],
    queryFn: fetchComment, //this function is defined under api / comment.ts
  });

  const addComment = async (newComment: UserComment): Promise<UserComment> => {
    const res = await axios.post(CommentsApi, {
      //inside the axios post method we provide the apiurl and the data
      ...newComment,
      productId,
      date: new Date().toISOString(),
    });
    return res.data;
  };

  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Comments"] }),
  });

  const handlePost = () => {
    if (comment.UserName === "" || comment.body === "" || comment.rating <= 0) {
      toast.error(`${COMMENT_FAILED}`);
    } else {
      addMutation.mutate(comment);
      toast.success(`${COMMENT_SUCCESS}`);
    }
    setComment({
      UserName: "",
      Email: "",
      rating: 0,
      body: "",
    });
  };

  const FilteredComments = data?.filter(
    (item) => String(item.productId) === productId,
  );

  const TotalRating = FilteredComments?.reduce((acc, val) => {
    return acc + val.rating;
  }, 0);

  const AverageRating = TotalRating
    ? TotalRating / Number(FilteredComments?.length)
    : 0;

  useEffect(() => {
    reviewsCount(FilteredComments?.length || 0); //this lifting state up concept , here using the setter functioning we are updating the reveiwsCount
    averageRating(AverageRating);
  }, [
    FilteredComments,
    reviewsCount,
    TotalRating,
    averageRating,
    AverageRating,
  ]);

  if (isLoading) {
    return (
      <div className="m-4 flex w-full items-center justify-center space-y-4 sm:m-8 sm:w-3/4">
        <p className="text-xl font-bold ">{LOADING_COMMENTS}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-4 flex w-full items-center justify-center space-y-4 sm:m-8 sm:w-3/4">
        <p className="text-xl font-bold text-red-600">
          {FAILED_LOADING_COMMENTS}
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 flex w-full flex-col space-y-4 sm:w-3/4">
      <div className="flex flex-row justify-between gap-3 p-2 sm:p-4">
        <p className="text-xl font-bold sm:text-2xl">{COMMENTS_REVIEWS}</p>
        <p className="bg-gray-200 text-gray-600 font-medium rounded-lg px-2 py-1">
          {(FilteredComments?.length ?? 0) <= 1
            ? `${FilteredComments?.length} Comment`
            : `${FilteredComments?.length} Comments`}
        </p>
      </div>
      <hr></hr>

      <div className="flex flex-col space-y-10 ">
        <h1 className="text-lg font-medium text-gray-700 sm:text-xl">{WRITE_COMMENT}</h1>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:w-3/4 lg:grid-cols-3 lg:gap-4">
          <div>
            <Input
              type="text"
              placeholder=" Your Name "
              onChange={(e) =>
                setComment({ ...comment, UserName: e.target.value })
              }
              value={comment.UserName}
              className="w-full rounded-md border-2 border-gray-300 p-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-4"
            />
          </div>
          <div>
            {" "}
            <Input
              type="email"
              placeholder="Email (optional) "
              onChange={(e) =>
                setComment({ ...comment, Email: e.target.value })
              }
              value={comment.Email}
              className="w-full rounded-md border-2 border-gray-300 p-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-4"
            />
          </div>
          <div className="flex items-center space-x-4">
            <h1 className="font-medium text-gray-400">{RATING}</h1>
            <select
              className="border border-gray-500 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              value={comment.rating}
              onChange={(e) =>
                setComment({ ...comment, rating: Number(e.target.value) })
              }
            >
              {[1, 2, 3, 4, 5].map((val, id) => (
                <option key={id} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>
        <textarea
          className="h-24 w-full resize-none rounded-md border-2 border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your Experience with this Product..."
          onChange={(e) => setComment({ ...comment, body: e.target.value })}
          value={comment.body}
        ></textarea>
        <div className="flex justify-end">
          <Button
            className="bg-red-600 text-white rounded-lg px-4 py-1"
            onClick={() => handlePost()}
            children={POST_COMMENT}
          />
        </div>

        {/* This is for the User Comments section */}
        {FilteredComments?.length ? (
          <div className="flex flex-col space-y-14">
            {FilteredComments.map((item, key) => (
              <div key={key} className="flex flex-col space-y-2">
                <div className="flex w-full items-center justify-start gap-3 sm:w-1/2 sm:gap-8">
                  <p className="rounded-full bg-gray-400 text-white px-4 py-2 ">
                    {item.UserName.split(" ").map((item) =>
                      item[0]?.toUpperCase(),
                    )}
                  </p>
                  <p className="break-all font-bold sm:text-xl">{item.UserName}</p>
                  <p className="break-all text-sm font-medium text-gray-500">
                    {item.Email.length > 0 ? `(${item.Email})` : ""}
                  </p>
                </div>
                <p>
                  {RATING}
                  {item?.rating ? "⭐".repeat(Math.floor(item.rating)) : "⭐"}
                </p>
                <p className="text-xl font-medium text-gray-700 ">
                  {item.body}
                </p>
                <p>{item.date?.slice(0, 10)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-bold ">{NO_COMMENTS}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
