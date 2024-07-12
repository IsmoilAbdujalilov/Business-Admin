import App from "./App.tsx";
import { store } from "store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attempIndex) => Math.min(1000 * 2 ** attempIndex, 30000),
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);
