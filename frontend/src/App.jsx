import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./features/PrivateRoute";
import AdminRoute from "./features/AdminRoute";
import { ContextProvider } from "./features/products/ContextProvider";
import AppLayout from "./pages/AppLayout";
import ErrorPages from "./pages/ErrorPages";
import Spinner from "./ui/Spinner"

// Lazy load pages
const LoginPages = lazy(() => import("./pages/LoginPages"));
const RegisterPages = lazy(() => import("./pages/RegisterPages"));
const OrderPages = lazy(() => import("./pages/OrderPages"));
const PlaceorderPages = lazy(() => import("./pages/PlaceorderPages"));
const CartPages = lazy(() => import("./pages/CartPages"));
const PaymentPages = lazy(() => import("./pages/PaymentPages"));
const Landing = lazy(() => import("./pages/Landing"));
const DetailPages = lazy(() => import("./pages/DetailPages"));
const ProfilePages = lazy(() => import("./pages/ProfilePages"));
const ShippingPages = lazy(() => import("./pages/ShippingPages"));
const OrderListPages = lazy(() => import("./pages/OrderListPages"));
const ProductListPages = lazy(() => import("./pages/ProductListPages"));
const UserListPages = lazy(() => import("./pages/UserListPages"));
const ProductPages = lazy(() => import("./pages/ProductPages"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContextProvider>
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
  return (
    <Suspense fallback={<div><Spinner/></div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
