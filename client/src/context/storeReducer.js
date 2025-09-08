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

  if (type === "logout") {
    return {
      ...state,
      token: "",
      payload: "",
    };
  }

  return state;
};

export default storeReducer;
