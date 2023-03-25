import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { videoProps, width } = props;
  const navigate = useNavigate();

  const handleClick = (id: string): void => {
    navigate(`/video/${id}`);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const saveToPlayList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    videoId: string
  ) => {
    setAnchorEl(event.currentTarget);
    console.log(videoId);
    setIsMenuOpen(true);
  };

  return (
    <Card
      sx={{
        ...{ width },
        // display: "flex",
        // width: { xs: "100% !important" },
        height: 310,
        mt: 0.6,
        borderRadius: 0,
        backgroundColor: "primary.main",
        transition: ".2s",
        cursor: "pointer",
        boxShadow: 0,
        "&:hover": {
          transform: "scale(1.04)",
        },
      }}
    >
      <CardMedia
        sx={{ height: 180, borderRadius: 3 }}
        image={`${videoProps?.snippet?.thumbnails?.high?.url}`}
        title={`${videoProps?.snippet?.title}`}
        onClick={() => handleClick(videoProps.id.videoId)}
      />
      <CardContent sx={{ height: 105 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "secondary.main",
          }}
        >
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{ maxWidth: "70%", border: "1px solid red" }}
          >
            {`${videoProps?.snippet?.title}`.slice(0, 40)}
            ...
          </Typography>

          <IconButton onClick={(e) => saveToPlayList(e, videoProps.id.videoId)}>
            <MoreVertIcon sx={{ color: "secondary.main" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem>Save to playlist</MenuItem>
            <MenuItem>Add to watch later</MenuItem>
          </Menu>
        </Box>
        <Typography variant="body2" color="secondary.dark">
          {`${videoProps?.snippet?.channelTitle}`}
          {<CheckCircleIcon sx={{ fontSize: ".9rem" }} />}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CoverVideoCard;
