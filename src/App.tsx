import React from "react";
import { useRoutes } from "react-router-dom";
import Navbar from "components/Navbar";

const App: React.FC = (): JSX.Element => {
  const Routes = {
    path: "/",
    element: <Navbar />,
  };
  const routing = useRoutes([Routes]);

  return <>{routing}</>;
};

export default App;
