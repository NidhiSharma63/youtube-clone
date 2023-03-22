import { Grid } from "@mui/material";

import { IVideo } from "common/Interfaces";
import { useEffect, useState } from "react";

import CoverVideoCard from "components/CoverVideoCard";

interface IVideoProps {
  videoProps: IVideo;
}

const HomePage = ({ videoProps }: IVideoProps) => {
  const [publishedTime, setPublishedTime] = useState<string>();

  useEffect(() => {
    const interval = setInterval(() => {
      const videoPublishedTime = new Date(videoProps.snippet.publishTime);
      const todaysTime = new Date();

      const differenceBetweenTime =
        todaysTime.getTime() - videoPublishedTime.getTime();

      // Convert milliseconds to seconds, minutes, hours, or days as necessary
      var seconds = Math.floor(differenceBetweenTime / 1000);

      if (seconds < 60) {
        setPublishedTime(`${seconds} second${seconds > 1 ? "s" : ""}`);
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setPublishedTime(`${minutes} minute${minutes > 1 ? "s" : ""}`);
      } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        setPublishedTime(`${hours} hour${hours > 1 ? "s" : ""}`);
      } else if (seconds < 31536000) {
        const days = Math.floor(seconds / 86400);
        setPublishedTime(`${days} day${days > 1 ? "s" : ""}`);
      } else {
        const years = Math.floor(seconds / 31536000);
        setPublishedTime(`${years} year${years > 1 ? "s" : ""}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid item lg={3} sm={4} xs={6}>
      <CoverVideoCard videoProps={videoProps} width={{ maxWidth: 320 }} />
    </Grid>
  );
};

export default HomePage;
