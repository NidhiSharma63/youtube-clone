import React from "react";
import { useRoutes } from "react-router-dom";
import { Typography } from "@mui/material";

const App: React.FC = (): JSX.Element => {
  const Routes = {
    path: "/",
    element: (
      <Typography variant="h1" color="secondary.main">
        Hello jii
      </Typography>
    ),
  };
  const routing = useRoutes([Routes]);

  return <>{routing}</>;
};

export default App;
