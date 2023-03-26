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
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { IVideo } from "common/Interfaces";

interface IProps {
  videoProps: IVideo;
  width: {
    maxWidth?: number;
    width?: number;
  };
  setPlayListVideoId?: Dispatch<SetStateAction<string[]>>;
}

const CoverVideoCard = (props: IProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { videoProps, width, setPlayListVideoId } = props;
  // const [playListVideoId, setPlayListVideoId] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleClick = (id: string): void => {
    navigate(`/video/${id}`);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const openOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(playListVideoId, "playListVideoId at open options");
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const saveToPlayList = (
    event: React.MouseEvent<HTMLLIElement>,
    videoId: string
  ) => {
    if (setPlayListVideoId) {
      setPlayListVideoId((prev) => [...prev, videoId]);
    }
    setIsMenuOpen(false);
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        ...{ width },
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

          <IconButton onClick={(e) => openOptions(e)}>
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
            <MenuItem>Add to watch later</MenuItem>
            <MenuItem onClick={(e) => saveToPlayList(e, videoProps.id.videoId)}>
              Save to playlist
            </MenuItem>
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
