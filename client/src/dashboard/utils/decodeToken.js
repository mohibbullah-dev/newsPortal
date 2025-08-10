import { jwtDecode } from "jwt-decode";

const decodeTOken = (token) => {
  if (token) {
    try {
      const decoded_token = jwtDecode(token);
      // const exp = Date.now(decoded_token.exp * 1000) + 1 * 60 * 1000;

      // const exp = new Date(decoded_token.exp * 1000);
      const exp = decoded_token.exp * 1000;

      if (Date.now() > exp) {
        localStorage.removeItem("newsToken");
        return "";
      } else {
        return decoded_token;
      }
    } catch (error) {
      return "";
    }
  } else {
    return "";
  }
};

export default decodeTOken;
