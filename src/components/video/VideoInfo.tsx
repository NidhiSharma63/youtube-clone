import { Box, Typography, Button, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import formatCounts from "utils/formatCounts";
import ReplyIcon from "@mui/icons-material/Reply";
import DownloadIcon from "@mui/icons-material/Download";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

interface IVideoInfoProps {
  videoProps: {
    channelTitle: string;
    channelId: string;
    likeCount: string;
  };
}

const VideoInfo = ({ videoProps }: IVideoInfoProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", custom: "row" },
        gap: ".5rem",
      }}
    >
      {/*  */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to={`/channel/${videoProps.channelId}`}>
          <Typography sx={{ color: "secondary.main" }}>
            {videoProps.channelTitle}
          </Typography>
        </Link>
        <CheckCircleIcon
          sx={{ fontSize: ".9rem", ml: 1, color: "secondary.dark" }}
        />
        <Button
          variant="contained"
          sx={{
            ml: 3,
            borderRadius: 5,
            backgroundColor: "secondary.main",
            color: "primary.main",
          }}
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
          sx={{ backgroundColor: "info.main", borderRadius: 5 }}
          startIcon={<ThumbUpIcon />}
        >
          {formatCounts(videoProps.likeCount)}
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "info.main", borderRadius: 5 }}
          startIcon={<ReplyIcon />}
        >
          share
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "info.main", borderRadius: 5 }}
          startIcon={<DownloadIcon />}
        >
          Download
        </Button>
        <IconButton
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"
          sx={{ backgroundColor: "info.main", color: "secondary.main" }}
        >
          <MoreIcon />
        </IconButton>
      </Box>

      {/*  */}
    </Box>
  );
};

export default VideoInfo;
