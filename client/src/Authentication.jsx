/* eslint-disable react/prop-types */
import { Navigate } from "react-router";
import secureLocalStorage from "react-secure-storage";

const Authentication = ({ children }) => {
  const local = secureLocalStorage.getItem("token");
  return local ? children : <Navigate to="/" />;
};

export default Authentication;
