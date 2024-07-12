import routes from "Routes";
import { Suspense } from "react";
import { Loader } from "components";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer />
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default App;
