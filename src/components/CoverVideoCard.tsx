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
import { toast } from "react-toastify";
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

  // console.log(videoProps, "video props");
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
    toast.info("video added to playlist");
  };

  const saveToWatchLaterFun = (
    event: React.MouseEvent<HTMLLIElement>,
    videoId: string
  ) => {
    setIsMenuOpen(false);
    setAnchorEl(null);
    dispatch({ type: "addToWatchLater", payload: { videoId: videoId } });
    toast.info("video added to watch later");
  };

  const removeFromWatchLaterFun = (
    event: React.MouseEvent<HTMLLIElement>,
    videoId: string
  ) => {
    setIsMenuOpen(false);
    setAnchorEl(null);
    dispatch({ type: "removeFromWatchLater", payload: { videoId: videoId } });
    toast.info("video removed from watch later");
  };

  const removeFromPlaylistFun = (
    event: React.MouseEvent<HTMLLIElement>,
    videoId: string
  ) => {
    setIsMenuOpen(false);
    setAnchorEl(null);
    dispatch({ type: "removeFromPlayList", payload: { videoId: videoId } });
    toast.info("video removed from playlist");
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
        onClick={() => handleClick(videoProps.id.videoId ?? videoProps.id)}
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
              return item === (videoProps.id.videoId ?? videoProps.id);
            }) ? (
              <MenuItem
                onClick={(e) =>
                  removeFromWatchLaterFun(
                    e,
                    videoProps.id.videoId ?? videoProps.id
                  )
                }
              >
                Remove from watch later
              </MenuItem>
            ) : (
              <MenuItem
                onClick={(e) =>
                  saveToWatchLaterFun(e, videoProps.id.videoId ?? videoProps.id)
                }
              >
                Add to watch later
              </MenuItem>
            )}
            {saveToPlayelist.find((item) => {
              // console.log(item);
              return item === (videoProps.id.videoId || videoProps.id);
            }) ? (
              <MenuItem
                onClick={(e) =>
                  removeFromPlaylistFun(
                    e,
                    videoProps.id.videoId ?? videoProps.id
                  )
                }
              >
                Remove from playlist
              </MenuItem>
            ) : (
              <MenuItem
                onClick={(e) =>
                  saveToPlayListFun(e, videoProps.id.videoId ?? videoProps.id)
                }
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
