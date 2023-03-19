import React from "react";
import { useRoutes } from "react-router-dom";
import DrawerComponent from "components/layout/DrawerComponent";
import Home from "pages/Home";

const App: React.FC = (): JSX.Element => {
  const Routes = {
    path: "/",
    element: <DrawerComponent />,
    children: [{ path: "/", element: <Home /> }],
  };
  const routing = useRoutes([Routes]);

  return <>{routing}</>;
};

export default App;
