// import React from "react";
// import decodeTOken from "../dashboard/utils/decodeToken";

// const storeReducer = (state, action) => {
//   const { type, payload } = action;
//   if (type === "login_succefull") {
//     state.token = payload.token;
//     state.userInfo = decodeTOken(payload.token);
//   }
//   return state;
// };
// export default storeReducer;

import decodeToken from "../dashboard/utils/decodeToken";

const storeReducer = (state, action) => {
  const { type, payload } = action;

  if (type === "login_succefull") {
    return {
      ...state,
      token: payload.token,
      userInfo: decodeToken(payload.token),
    };
  }

  return state;
};

export default storeReducer;
