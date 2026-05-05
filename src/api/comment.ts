import type { UserComments } from "../Types/ApiResponse";
import axios from "axios";

export const fetchComment = async () => {
  const COMMENTS_API = import.meta.env.VITE_COMMENTS_BASE_URL;
  const res = await axios.get<UserComments>(COMMENTS_API);
  return res.data;
};
