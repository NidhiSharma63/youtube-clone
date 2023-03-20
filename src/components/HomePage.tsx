import { Grid, Card, Typography, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { IVideo } from "common/Interfaces";
import { useEffect, useState } from "react";

interface IVideoProps {
  videoProps: IVideo;
}

const HomePage = ({ videoProps }: IVideoProps) => {
  const [publishedTime, setPublishedTime] = useState<string>();

  useEffect(() => {
    const videoPublishedTime = new Date(videoProps.snippet.publishTime);
    const todaysTime = new Date();
    let minutes: number | undefined;
    let hours: number | undefined;
    let days: number | undefined;
    let year: number | undefined;

    const differenceBetweenTime =
      todaysTime.getTime() - videoPublishedTime.getTime();

    // Convert milliseconds to seconds, minutes, hours, or days as necessary
    var seconds = Math.floor(differenceBetweenTime / 1000);
    setPublishedTime(`${seconds} second${seconds > 1 ? "s" : ""}`);

    if (seconds >= 60) {
      minutes = Math.floor(differenceBetweenTime / 60000);
      setPublishedTime(`${minutes} minute${minutes > 1 ? "s" : ""}`);
    }
    if (minutes && minutes >= 60) {
      hours = Math.floor(minutes / 60);
      setPublishedTime(`${hours} hour${hours > 1 ? "s" : ""}`);
    }
    if (hours && hours >= 24) {
      days = Math.floor(hours / 24);
      setPublishedTime(`${days} day${days > 1 ? "s" : ""}`);
    }

    if (days && days >= 365) {
      year = Math.floor(days / 365);
      setPublishedTime(`${year} year${year > 1 ? "s" : ""}`);
    }
  }, [videoProps]);

  return (
    <Grid item lg={3} sm={4} xs={6}>
      <Card
        sx={{
          maxWidth: 345,
          height: 280,
          borderRadius: 0,
          backgroundColor: "primary.main",
          transition: ".2s",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.04)",
          },
        }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image={`${videoProps?.snippet?.thumbnails?.high?.url}`}
          title={`${videoProps?.snippet?.title}`}
        />
        <CardContent>
          <Typography
            sx={{ height: 55 }}
            gutterBottom
            variant="subtitle1"
            color="secondary.main"
          >
            {`${videoProps?.snippet?.title}`.slice(0, 40)}
            ...
          </Typography>
          <Typography variant="body2" color="secondary.dark">
            {`${videoProps?.snippet?.channelTitle}`}
            {<CheckCircleIcon sx={{ fontSize: ".9rem" }} />}
          </Typography>
          <Typography color="secondary.dark" variant="body2">
            {publishedTime}ago
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HomePage;
