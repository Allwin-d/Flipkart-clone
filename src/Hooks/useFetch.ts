import { useEffect, useState } from "react";
import type { ApiResponse } from "../Types/ApiResponse";
import axios from "axios";

const useFetch = (url: string) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get<ApiResponse>(url); //by using axios we don't need to convert it to JSON format 
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);  //when ever the url changes this hook runs 

  return { data, loading, error };
};

export default useFetch;
