import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/utils/ThemeProvider";
import { Provider } from "react-redux";
import store from "./redux/store";
import routes from "./routes";

const router = createBrowserRouter(routes);
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
