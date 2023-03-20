import { Box, Typography, Button, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import formatLikes from "utils/formatLikes";
import ReplyIcon from "@mui/icons-material/Reply";
import DownloadIcon from "@mui/icons-material/Download";
import MoreIcon from "@mui/icons-material/MoreVert";

interface IVideoInfoProps {
  videoProps: {
    channelTitle: string;
    likeCount: string;
  };
}

const VideoInfo = ({ videoProps }: IVideoInfoProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        // border: "1px solid red",
      }}
    >
      {/*  */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" color="secondary.main">
          {videoProps.channelTitle}
        </Typography>
        <CheckCircleIcon
          sx={{ fontSize: ".9rem", ml: 1, color: "secondary.dark" }}
        />
        <Button
          variant="contained"
          color="info"
          sx={{ ml: 3, borderRadius: 5 }}
        >
          Subscribe
        </Button>
      </Box>
      {/*  */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "#9c9a9a", borderRadius: 5 }}
          startIcon={<ThumbUpIcon />}
        >
          {formatLikes(videoProps.likeCount)}
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#9c9a9a", borderRadius: 5 }}
          startIcon={<ReplyIcon />}
        >
          share
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#9c9a9a", borderRadius: 5 }}
          startIcon={<DownloadIcon />}
        >
          Download
        </Button>
        <IconButton
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"
          sx={{ backgroundColor: "#9c9a9a", color: "secondary.main" }}
        >
          <MoreIcon />
        </IconButton>
      </Box>

      {/*  */}
    </Box>
  );
};

export default VideoInfo;
