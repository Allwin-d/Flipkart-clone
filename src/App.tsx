import { Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Product from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <div>
      <Header />
      <Route path="/" element={<Home />}></Route>
      <Route path="/Cart" element={<Cart />}></Route>
      <Route path="/About" element={<About />}></Route>
      <Route path="/Product" element={<Product />}></Route>
      <Route path="/ProductDetials:/id" element={<ProductDetails />}></Route>
    </div>
  );
};

export default App;
