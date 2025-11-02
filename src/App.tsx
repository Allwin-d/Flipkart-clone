import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  const queryclient = new QueryClient();

  return (
    <div>
      <Header />
      <QueryClientProvider client={queryclient}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route
            path="/ProductDetails/:id"
            element={<ProductDetails />}
          ></Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
