import type { ApiResponseType } from "../Types/ApiResponse";

export type ContextType = {
  data: ApiResponseType | undefined;
  isLoading: boolean;
  isError: boolean;
};
