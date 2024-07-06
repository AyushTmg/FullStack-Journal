import { decodeToken } from "react-jwt";
export const getUserDetails = () => {
  const access_token = localStorage.getItem("access_token");
  const decoded_token = decodeToken(access_token);
  return decoded_token;
};
