import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { storeContext } from "../context/storeContext";

const ProjectDashboard = () => {
  const { store } = useContext(storeContext);

  if (store.userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to="/Login" />;
  }
};

export default ProjectDashboard;
