import { Grid, Card, Typography, CardContent, CardMedia } from "@mui/material";

import { useState } from "react";

import { IVideo } from "common/Interfaces";

interface IVideoProps {
  videoProps: IVideo;
}

const HomePage = ({ videoProps }: IVideoProps) => {
  return (
    <Grid container spacing={1}>
      {" "}
      <Grid item xs={3} border="1px solid red">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={`${videoProps?.snippet?.thumbnails?.high?.url}`}
            title={`${videoProps?.snippet?.title}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`${videoProps?.snippet?.title}`.slice(0, 45)}
              ...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${videoProps?.snippet?.channelTitle}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomePage;
