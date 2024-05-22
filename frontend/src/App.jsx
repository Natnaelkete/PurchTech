import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AppLayout,
  LoginPage,
  RegisterPage,
  OrderPage,
  PlaceorderPage,
  CartPage,
  PaymentPage,
  Landing,
  ErrorPage,
  DetailPage,
  ProfilePage,
  ShippingPage,
  OrderListPage,
  ProductListPage,
  UserListPage,
  ProductPage,
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
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Landing /> },
      { path: `/search/:search`, element: <ProductPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/shipping", element: <PrivateRoute component={ShippingPage} /> },
      { path: "/orders/:id", element: <PrivateRoute component={OrderPage} /> },
      {
        path: "/placeorder",
        element: <PrivateRoute component={PlaceorderPage} />,
      },
      { path: "/payment", element: <PrivateRoute component={PaymentPage} /> },
      { path: "/profile", element: <PrivateRoute component={ProfilePage} /> },
      {
        path: "/admin/orderlist",
        element: <AdminRoute component={OrderListPage} />,
      },
      {
        path: "/admin/productlist",
        element: <AdminRoute component={ProductListPage} />,
      },
      {
        path: "/admin/userlist",
        element: <AdminRoute component={UserListPage} />,
      },
      { path: "/product/:productId", element: <DetailPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
