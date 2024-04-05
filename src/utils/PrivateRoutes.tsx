import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutes = () => {
  let auth = localStorage.getItem("access_token")
    ? { token: true }
    : { token: false };

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
