import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { storeContext } from "../context/storeContext";

const ProtectRolo = ({ role }) => {
  const { store } = useContext(storeContext);

  if (store.userInfo?.role == "admin") {
    return <Outlet />;
  }
  if (store.userInfo?.role == "writer") {
    return <Outlet />;
  } else {
    return <Navigate to="/dashboard/access-unable" />;
  }
};

export default ProtectRolo;
