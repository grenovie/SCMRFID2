import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return user.isStaff;
};
const ProtectedStaff = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/not_here" />;
};

export default ProtectedStaff;
