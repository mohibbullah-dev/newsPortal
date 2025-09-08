import React, { useReducer } from "react";
import storeReducer from "./storeReducer";
import { storeContext } from "./storeContext";
import decodeTOken from "../dashboard/utils/decodeToken";

const StorePorver = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, {
    userInfo: decodeTOken(localStorage.getItem("newsToken") || null),
    token: localStorage.getItem("newsToken") || "",
  });
  console.log("context store value", store);
  return (
    <storeContext.Provider value={{ store, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};

export default StorePorver;
