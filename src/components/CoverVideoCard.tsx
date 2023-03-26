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
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IVideo } from "common/Interfaces";
import { SavedVideoContext } from "context/SavedVideoProvider";

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
  const { state, dispatch } = useContext(SavedVideoContext);
  const { videoProps, width } = props;
  const { saveToWatchLater, saveToPlayelist } = state;
  const navigate = useNavigate();

  const handleClick = (id: string): void => {
    navigate(`/video/${id}`);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const openOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const saveToPlayListFun = (
    event: React.MouseEvent<HTMLLIElement>,
    videoId: string
  ) => {
    setIsMenuOpen(false);
    setAnchorEl(null);
    dispatch({ type: "addToPlayList", payload: { videoId: videoId } });
  };

  const saveToWatchLaterFun = (
    event: React.MouseEvent<HTMLLIElement>,
    videoId: string
  ) => {
    setIsMenuOpen(false);
    setAnchorEl(null);
    dispatch({ type: "addToWatchLater", payload: { videoId: videoId } });
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
          <Typography gutterBottom variant="subtitle1" sx={{ maxWidth: "70%" }}>
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
            {saveToWatchLater.find((item) => {
              // console.log(item);
              return item === videoProps.id.videoId;
            }) ? (
              <MenuItem
                onClick={(e) => saveToWatchLaterFun(e, videoProps.id.videoId)}
              >
                Remove from watch later
              </MenuItem>
            ) : (
              <MenuItem
                onClick={(e) => saveToWatchLaterFun(e, videoProps.id.videoId)}
              >
                Add to watch later
              </MenuItem>
            )}
            {saveToPlayelist.find((item) => {
              // console.log(item);
              return item === videoProps.id.videoId;
            }) ? (
              <MenuItem
                onClick={(e) => saveToWatchLaterFun(e, videoProps.id.videoId)}
              >
                Remove from playlist
              </MenuItem>
            ) : (
              <MenuItem
                onClick={(e) => saveToPlayListFun(e, videoProps.id.videoId)}
              >
                Save to playlist
              </MenuItem>
            )}
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
