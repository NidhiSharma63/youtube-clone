import { Box } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // set the height of the parent container
      }}
    >
      <ThreeDots color="#fff" ariaLabel="loading" />
    </Box>
  );
};

export default Loader;
