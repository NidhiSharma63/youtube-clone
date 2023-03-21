import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useNavigate } from "react-router-dom";
import { IVideo } from "common/Interfaces";

interface IProps {
  videoProps: IVideo;
  width: {
    maxWidth?: number;
    width?: number;
  };
}

const CoverVideoCard = (props: IProps) => {
  const { videoProps, width } = props;
  const naigate = useNavigate();
  const handleClick = (id: string): void => {
    naigate(`video/${id}`);
  };

  return (
    <Card
      sx={{
        ...{ width },
        height: 320,
        mt: 0.6,
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
        sx={{ height: 200 }}
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
        {/* <Typography color="secondary.dark" variant="body2">
          {publishedTime} ago
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default CoverVideoCard;
