import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import SignIn from "./pages/SignIn";
import Products from "./pages/Products";

const App = () => {
  const queryclient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryclient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/ProductDetail" element={<ProductDetails />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/Product" element={<Products />}></Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
