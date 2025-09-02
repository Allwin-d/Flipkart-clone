import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import SignIn from "./pages/SignIn";
import Products from "./pages/Products";
import { Provider } from "react-redux";
import { store } from "./Store";

const App = () => {
  const queryclient = new QueryClient();

  return (
    <div>
      <Provider store={store}>
        <QueryClientProvider client={queryclient}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/ProductDetail" element={<ProductDetails />}></Route>
            <Route path="/SignIn" element={<SignIn />}></Route>
            <Route path="/Product" element={<Products />}></Route>
          </Routes>
        </QueryClientProvider>
      </Provider>
    </div>
  );
};

export default App;
