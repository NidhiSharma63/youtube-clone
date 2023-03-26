import { Grid, Typography } from "@mui/material";
import useFetchWatchLaterVideos from "hook/useFetchWatchLaterVideo";
import { IVideo } from "common/Interfaces";
import HomePage from "components/HomePage";
import { v4 as uuidv4 } from "uuid";
import Loader from "components/Loader";

interface IItems {
  watchLaterVideo: IVideo[];
  isLoading: boolean;
}

const Watchlater = () => {
  const { watchLaterVideo, isLoading }: IItems = useFetchWatchLaterVideos();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Grid
      container
      spacing={1}
      sx={{
        height: { xs: "auto" },
        overflowY: "scroll",
        overflowX: "hidden",
        justifyContent: "flex-start",
      }}
    >
      {watchLaterVideo.length > 0 ? (
        watchLaterVideo.map((item) => {
          return <HomePage key={uuidv4()} videoProps={item} />;
        })
      ) : (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "secondary.main",
            height: "80vh",
          }}
        >
          <Typography variant="h5">Your watch later is empty!</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Watchlater;
