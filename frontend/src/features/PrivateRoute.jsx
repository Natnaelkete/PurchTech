import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Component {...rest} /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
