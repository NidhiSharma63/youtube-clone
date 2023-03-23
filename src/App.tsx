import React from "react";
import { useRoutes } from "react-router-dom";
import DrawerComponent from "components/layout/DrawerComponent";
import Home from "pages/Home";
import Video from "pages/Video";
import Channel from "pages/Channel";

const App: React.FC = (): JSX.Element => {
  const Routes = {
    path: "/",
    element: <DrawerComponent />,
    children: [
      { path: "/:search?", element: <Home /> },
      { path: "/video/:id", element: <Video /> },
      { path: "/channel/:id", element: <Channel /> },
    ],
  };
  const routing = useRoutes([Routes]);

  return <>{routing}</>;
};

export default App;
