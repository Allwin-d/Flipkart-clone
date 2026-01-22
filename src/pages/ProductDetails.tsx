import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../Types/ApiResponse";

const ProductDetails = () => {
  const [data, setData] = useState<Product | null>(null);
  const { id } = useParams();
  const SINGLE_PRODUCTAPIURL = import.meta.env.VITE_SINGLE_PRODUCT_API;

  console.log("This is the id from the Product Details page : ", id);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `${SINGLE_PRODUCTAPIURL}${id}`,
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSingleProduct();
  }, [id, SINGLE_PRODUCTAPIURL]);

  console.log("Single Product Data: ", data);

  return <div></div>;
};

export default ProductDetails;
