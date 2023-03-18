import React from "react";
import { useRoutes } from "react-router-dom";

const App: React.FC = (): JSX.Element => {
  const Routes = {
    path: "/",
    element: <h1>Hello jii</h1>,
  };
  const routing = useRoutes([Routes]);

  return <>{routing}</>;
};

export default App;
