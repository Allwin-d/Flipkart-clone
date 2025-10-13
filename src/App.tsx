import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const queryclient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryclient}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
