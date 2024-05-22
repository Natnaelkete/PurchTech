import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AppLayout,
  LoginPages,
  RegisterPages,
  OrderPages,
  PlaceorderPages,
  CartPages,
  PaymentPages,
  Landing,
  ErrorPages,
  DetailPages,
  ProfilePages,
  ShippingPages,
  OrderListPages,
  ProductListPages,
  UserListPages,
  ProductPages,
} from "./pages/index";
import PrivateRoute from "./features/PrivateRoute";
import AdminRoute from "./features/AdminRoute";
import { ContextProvider } from "./features/products/ContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContextProvider>
        {" "}
        <AppLayout />
      </ContextProvider>
    ),
    errorElement: <ErrorPages />,
    children: [
      { index: true, element: <Landing /> },
      { path: `/search/:search`, element: <ProductPages /> },
      { path: "/cart", element: <CartPages /> },
      {
        path: "/shipping",
        element: <PrivateRoute component={ShippingPages} />,
      },
      { path: "/orders/:id", element: <PrivateRoute component={OrderPages} /> },
      {
        path: "/placeorder",
        element: <PrivateRoute component={PlaceorderPages} />,
      },
      { path: "/payment", element: <PrivateRoute component={PaymentPages} /> },
      { path: "/profile", element: <PrivateRoute component={ProfilePages} /> },
      {
        path: "/admin/orderlist",
        element: <AdminRoute component={OrderListPages} />,
      },
      {
        path: "/admin/productlist",
        element: <AdminRoute component={ProductListPages} />,
      },
      {
        path: "/admin/userlist",
        element: <AdminRoute component={UserListPages} />,
      },
      { path: "/product/:productId", element: <DetailPages /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPages />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/register",
    element: <RegisterPages />,
    errorElement: <ErrorPages />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
