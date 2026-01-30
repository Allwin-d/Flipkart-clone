import { useLocation } from "react-router-dom";

const Products = () => {
  const { state } = useLocation();
  console.log("State from the products Page : ", state);

  return (
    <div>
      <p>Helloooo</p>
    </div>
  );
};

export default Products;
