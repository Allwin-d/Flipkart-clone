// import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import About from "./pages/About";
// import Product from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Footer from "./components/Footer";

import Navbar from "./components/Navbar";

const App = () => {
  // const queryClient = new QueryClient(); //this is the central data store / cache
  // console.log("This is Query Client : ", queryClient);

  //this QueryClientProvider this is like a power supply

  return (
    <div>
      {/* <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </QueryClientProvider> */}
      <Navbar />
    </div>
  );
};

export default App;
