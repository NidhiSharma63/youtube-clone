import React from "react";
import { useRoutes } from "react-router-dom";
import Navbar from "components/Navbar";
import DrawerComponent from "components/DrawerComponent";

const App: React.FC = (): JSX.Element => {
  const Routes = {
    path: "/",
    element: <DrawerComponent />,
  };
  const routing = useRoutes([Routes]);

  return <>{routing}</>;
};

export default App;
