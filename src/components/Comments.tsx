import { useEffect, useState } from "react";
import type { UserComment, UserComments } from "../Types/ApiResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type CommentsProps = {
  productId: string;
  reviewsCount: (count: number) => void;
  averageRating: (count: number) => void;
};

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

  const SINGLE_PRODUCT_COMMENT_API = import.meta.env
    .VITE_SINGLE_PROUDCT_COMMENTS;
  console.log("Single Product Comment Api : ", SINGLE_PRODUCT_COMMENT_API);

  console.log("Comment details : ", comment);

  const CommentsApi = import.meta.env.VITE_COMMENTS_BASE_URL;
  const queryClient = useQueryClient();

  const fetchComments = async (): Promise<UserComments> => {
    const res = await axios.get(CommentsApi);
    console.log("All Comments from All the Product : ", res.data);
    return res.data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["Comments"],
    queryFn: fetchComments,
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
    addMutation.mutate(comment);
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
  console.log("Comments for this Product : ", FilteredComments);

  const TotalRating = FilteredComments?.reduce((acc, val) => {
    return acc + val.rating;
  }, 0);

  const AverageRating = TotalRating
    ? TotalRating / Number(FilteredComments?.length)
    : 0;

  useEffect(() => {
    reviewsCount(FilteredComments?.length || 0);   //this lifting state up concept , here using the setter functioning we are updating the reveiwsCount
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
      <div className="flex w-2/4 items-center justify-center m-8  space-y-4">
        <p className="text-xl font-bold ">Loading Comments....</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center w-2/4 m-8  space-y-4">
        <p className="text-xl font-bold text-red-600">
          Failed to Fetch Comments
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-2/4 m-8  space-y-4">
      <div className="flex flex-row justify-between p-4">
        <p className="text-2xl font-bold">Comments & Reviews</p>
        <p className="bg-gray-200 text-gray-600 font-medium rounded-lg px-2 py-1">
          {FilteredComments?.length === 1
            ? `${FilteredComments?.length} Comment`
            : `${FilteredComments} Comments`}
        </p>
      </div>
      <hr></hr>

      <div className="flex flex-col space-y-10 ">
        <h1 className="text-xl text-gray-700 font-medium">Write a Comment</h1>
        <div className="flex flex-row w-3/4 justify-between">
          <div>
            <input
              type="text"
              placeholder=" Your Name "
              onChange={(e) =>
                setComment({ ...comment, UserName: e.target.value })
              }
              value={comment.UserName}
              className="p-2 border-2 border-gray-300 focus:ring-2 ring-blue-500 focus:outline-none rounded-md px-12 font-medium"
            ></input>
          </div>
          <div>
            {" "}
            <input
              type="email"
              placeholder="Email (optional) "
              onChange={(e) =>
                setComment({ ...comment, Email: e.target.value })
              }
              value={comment.Email}
              className="p-2 border-2 border-gray-300 focus:ring-2 ring-blue-500 focus:outline-none rounded-md px-12 font-medium"
            ></input>
          </div>
          <div className="flex items-center space-x-4">
            <h1 className="font-medium text-gray-400">Rating</h1>
            <select
              className="border border-gray-500 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              value={comment.rating}
              onChange={(e) =>
                setComment({ ...comment, rating: Number(e.target.value) })
              }
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>
        <textarea
          className="w-full h-24 p-3 border-gray-300 border-2 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md resize-none"
          placeholder="Share your Experience with this Product..."
          onChange={(e) => setComment({ ...comment, body: e.target.value })}
          value={comment.body}
        ></textarea>
        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white rounded-lg px-4 py-1"
            onClick={() => handlePost()}
          >
            Post Comment
          </button>
        </div>

        {/* This is for the User Comments section */}
        {FilteredComments?.length ? (
          <div className="flex flex-col space-y-14">
            {FilteredComments.map((item) => (
              <div key={item.id} className="flex flex-col space-y-2">
                <div className="flex items-center w-1/2 justify-start space-x-8">
                  <p className="rounded-full bg-gray-400 text-white px-4 py-2 ">
                    {item.UserName.split(" ").map((item) =>
                      item[0]?.toUpperCase(),
                    )}
                  </p>
                  <p className="font-bold text-xl">{item.UserName}</p>
                  <p className="font-medium text-gray-500">({item.Email})</p>
                </div>
                <p>
                  Rating
                  {item?.rating ? "⭐".repeat(Math.floor(item.rating)) : "⭐"}
                </p>
                <p className="text-xl font-medium text-gray-700 ">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-bold ">No Comments Added Yet 🚫</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
