import UseFetch from "../Hooks/UseFetch";
import type { ProductsResponse } from "../Types/types";

const Home =()=>{

    const API_URL = "https://dummyjson.com/products?limit=0";
    const {response} = UseFetch(API_URL);
    console.log(response); 

    return (
        <div>

        </div>
    )
}

export default Home;