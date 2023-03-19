import { Grid, Card, Typography, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { IVideo } from "common/Interfaces";

interface IVideoProps {
  videoProps: IVideo;
}

const HomePage = ({ videoProps }: IVideoProps) => {
  return (
    <Grid item xs={3}>
      <Card
        sx={{
          maxWidth: 345,
          height: 260,
          borderRadius: 0,
          backgroundColor: "primary.main",
        }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image={`${videoProps?.snippet?.thumbnails?.high?.url}`}
          title={`${videoProps?.snippet?.title}`}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" color="secondary.main">
            {`${videoProps?.snippet?.title}`.slice(0, 30)}
            ...
          </Typography>
          <Typography
            variant="body2"
            color="secondary.dark"
            fontWeight={"bold"}
          >
            {`${videoProps?.snippet?.channelTitle}`}
            {<CheckCircleIcon sx={{ fontSize: ".9rem" }} />}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HomePage;
