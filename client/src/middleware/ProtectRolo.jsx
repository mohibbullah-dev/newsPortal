import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectRolo = ({ role }) => {
  const userInfo = {
    name: "mohib",
    role: "writer",
  };

  if (userInfo.role == role) {
    return <Outlet />;
  } else {
    return <Navigate to="/dashboard/access-unable" />;
  }
};

export default ProtectRolo;
