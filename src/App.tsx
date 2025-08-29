import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  const queryclient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryclient}>
        <Navbar />
        <Home />
      </QueryClientProvider>
    </div>
  );
};

export default App;
