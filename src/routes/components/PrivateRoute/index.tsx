import { Layout } from "@/Components";
import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IPrivateRoute {
  children: ReactNode;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children }) => {
  // if (!(auth.isLogged && auth.token && !!user)) {
  //   return <Navigate to={routes.LOGIN} replace />;
  // }

  return <Layout>{children}</Layout>;
};

export default PrivateRoute;
