import { useState } from "react";
import type { UserComment, UserComments } from "../Types/ApiResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type CommentsProps = {
  productId: string;
};

const Comments = ({ productId }: CommentsProps) => {
  const [comment, setComment] = useState<UserComment>({
    UserName: "",
    Email: "",
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
      body: "",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p>Loading Comments....</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <p>Failed to Fetch Data</p>
      </div>
    );
  }

  const FilteredComments = data?.filter(
    (item) => String(item.productId) === productId,
  );
  console.log("Comments for this Product : ", FilteredComments);

  return (
    <div className="flex flex-col w-2/4 m-8  space-y-4">
      <div className="flex flex-row justify-between p-4">
        <p className="text-2xl font-bold">Comments & Reviews</p>
        <p className="bg-gray-200 text-gray-600 font-medium rounded-lg px-2 py-1">
          3 Comments
        </p>
      </div>
      <hr></hr>

      <div className="flex flex-col space-y-10 ">
        <h1 className="text-xl text-gray-700 font-medium">Write a Comment</h1>
        <div className="flex flex-row w-1/2 justify-between">
          <input
            type="text"
            placeholder=" Your Name "
            onChange={(e) =>
              setComment({ ...comment, UserName: e.target.value })
            }
            value={comment.UserName}
            className="p-2 border-2 border-gray-300 focus:ring-2 ring-blue-500 focus:outline-none rounded-md px-8"
          ></input>
          <input
            type="email"
            placeholder="Email (optional) "
            onChange={(e) => setComment({ ...comment, Email: e.target.value })}
            value={comment.Email}
            className="p-2 border-2 border-gray-300 focus:ring-2 ring-blue-500 focus:outline-none rounded-md px-8"
          ></input>
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
        {FilteredComments && (
          <div className="flex flex-col space-y-4">
            {FilteredComments.map((item) => (
              <div className="flex flex-col space-y-2">
                <p>{item.UserName}</p>
                <p>{item.Email}</p>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
