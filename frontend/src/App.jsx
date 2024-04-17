import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AppLayout,
  loginPage,
  registerPage,
  orderPage,
  placeorderPage,
  cartPage,
  paymentPage,
  Landing,
  errorPage,
  DetailPage,
} from "./pages/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <errorPage />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/cart", element: <cartPage /> },
      { path: "/order", element: <orderPage /> },
      { path: "/placeorder", element: <placeorderPage /> },
      { path: "/payment", element: <paymentPage /> },
      { path: "/product/:productId", element: <DetailPage /> },
    ],
  },
  {
    path: "/login",
    element: <loginPage />,
    errorElement: <errorPage />,
  },
  {
    path: "/register",
    element: <registerPage />,
    errorElement: <errorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
