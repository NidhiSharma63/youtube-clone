import { Grid } from "@mui/material";

import { IVideo } from "common/Interfaces";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

import CoverVideoCard from "components/CoverVideoCard";

interface IVideoProps {
  videoProps: IVideo;
  setPlayListVideoId: Dispatch<SetStateAction<string[]>>;
}

const HomePage = ({ videoProps, setPlayListVideoId }: IVideoProps) => {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const videoPublishedTime = new Date(videoProps.snippet.publishTime);
  //     const todaysTime = new Date();

  //     const differenceBetweenTime =
  //       todaysTime.getTime() - videoPublishedTime.getTime();

  //     // Convert milliseconds to seconds, minutes, hours, or days as necessary
  //     var seconds = Math.floor(differenceBetweenTime / 1000);

  //     if (seconds < 60) {
  //       setPublishedTime(`${seconds} second${seconds > 1 ? "s" : ""}`);
  //     } else if (seconds < 3600) {
  //       const minutes = Math.floor(seconds / 60);
  //       setPublishedTime(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  //     } else if (seconds < 86400) {
  //       const hours = Math.floor(seconds / 3600);
  //       setPublishedTime(`${hours} hour${hours > 1 ? "s" : ""}`);
  //     } else if (seconds < 31536000) {
  //       const days = Math.floor(seconds / 86400);
  //       setPublishedTime(`${days} day${days > 1 ? "s" : ""}`);
  //     } else {
  //       const years = Math.floor(seconds / 31536000);
  //       setPublishedTime(`${years} year${years > 1 ? "s" : ""}`);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // const [playListVideoId, setPlayListVideoId] = useState<string[]>([]);

  // // console.log("renders");
  // useEffect(() => {
  //   console.log(playListVideoId, "value is updated");
  // }, [playListVideoId]);

  return (
    <Grid
      item
      lg={3}
      md={4}
      sm={6}
      // xs={12}
      sx={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CoverVideoCard
        setPlayListVideoId={setPlayListVideoId}
        videoProps={videoProps}
        width={{ maxWidth: 320 }}
      />
    </Grid>
  );
};

export default HomePage;
