import { useContext, useEffect, useState } from "react";
import { SavedVideoContext } from "context/SavedVideoProvider";
import { Box, Grid, Typography } from "@mui/material";
import useFetchPlaylistVideos from "hook/useFetchPlaylistVideo";
import { IVideo } from "common/Interfaces";
import HomePage from "components/HomePage";
import { v4 as uuidv4 } from "uuid";

interface IItems {
  playlistData: IVideo[];
  isLoading: boolean;
}

const Playlist = () => {
  const { state } = useContext(SavedVideoContext);
  const { playlistData, isLoading }: IItems = useFetchPlaylistVideos();

  return (
    <Grid
      container
      spacing={1}
      sx={{
        height: { xs: "auto" },
        overflowY: "scroll",
        overflowX: "hidden",
        justifyContent: "center",
      }}
    >
      {playlistData.length > 0 ? (
        playlistData.map((item) => {
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
          <Typography variant="h5">Your playlist is empty!</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Playlist;
