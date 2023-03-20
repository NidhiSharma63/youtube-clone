import { Grid, Card, Typography, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { IVideo } from "common/Interfaces";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

interface IVideoProps {
  videoProps: IVideo;
}

const HomePage = ({ videoProps }: IVideoProps) => {
  const [publishedTime, setPublishedTime] = useState<string>();
  const naigate = useNavigate();
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

  const handleClick = (id: string): void => {
    naigate(`video/${id}`);
  };
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
        onClick={() => handleClick(videoProps.id.videoId)}
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
            {publishedTime} ago
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HomePage;
