import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./pages/ProductDetails";
import ContextProvider from "./Context/ContextProvider";
import Toast from "./components/Toast";
import { Provider } from "react-redux";
import { store } from "./Store/store";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="min-h-screen flex flex-col">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
            <Toast />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/checkout" element={<Checkout />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route
                path="/productDetails/:id"
                element={<ProductDetails />}
              ></Route>
            </Routes>
            <Footer />
          </ContextProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
};

export default App;
