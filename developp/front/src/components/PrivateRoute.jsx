// PrivateRoute.jsx

import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children || <Outlet />;
}

export default PrivateRoute;
