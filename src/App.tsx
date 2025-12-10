import { Routes, Route } from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default App;
