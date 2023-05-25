import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { isAuthenticated, isExpired, getToken } from "@/utils/auth";
import { refreshAccessToken } from "@/redux/Auth/AuthSlice";

function AuthenticatedRoutes({ children, roles }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const checkIsAuthenticated = isAuthenticated();

  // const token = getToken();
  const userDetails = JSON.parse(localStorage.getItem("userData"));

  // if (isExpired(token)) {
  //   dispatch(refreshAccessToken());
  // }

  const userHasRequiredRole = !!(
    userDetails && roles.includes(userDetails?.roles && userDetails?.roles.toString().toLowerCase())
  );

  if (!checkIsAuthenticated) {
    toast.error("You must be logged in to access this page");
    return <Navigate to='/' state={{ from: location }} />;
  }

  if (checkIsAuthenticated && !userHasRequiredRole) {
    toast.error("You are not authorized to access this page");
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
}

AuthenticatedRoutes.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.arrayOf(PropTypes.string)
};

export default AuthenticatedRoutes;
