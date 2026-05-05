import axios from "axios";
import type { UserComments } from "../Types/ApiResponse";

export const fetchComment = async () => {
  const COMMENTS_API = import.meta.env.VITE_COMMENTS_BASE_URL;
  const res = await axios.get<UserComments>(COMMENTS_API);
  console.log("Comments Data from api folder : ", res.data);
  return res.data;
};
