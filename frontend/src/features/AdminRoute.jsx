import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ component: Component, ...rest }) {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
}

export default AdminRoute;
