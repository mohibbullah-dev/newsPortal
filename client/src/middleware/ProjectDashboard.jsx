import React from "react";
import MainLayout from "../dashboard/layouts/MainLayout";
import { Outlet, Navigate } from "react-router";

const ProjectDashboard = () => {
  const userInfo = {
    name: "mohib",
    role: ["admin", "writer"],
  };

  if (userInfo.role.includes("admin")) {
    return <Outlet />;
  } else if (userInfo.role.includes("writer")) {
    return <Outlet />;
  } else {
    return <Navigate to="/Login" />;
  }
};

export default ProjectDashboard;
