import { FC, ReactNode } from "react";

interface IPublicRoute {
  children: ReactNode;
}

const PublicRoute: FC<IPublicRoute> = ({ children }) => {
  return children;
};

export default PublicRoute;
