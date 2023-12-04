import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { SavedVideoContext } from "context/SavedVideoProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CoverVideoCard = (props: any) => {
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

  console.log({ videoProps });
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const openOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const saveToPlayListFun = (event: React.MouseEvent<HTMLLIElement>, videoId: string) => {
    setIsMenuOpen(false);
    setAnchorEl(null);
    dispatch({ type: "addToPlayList", payload: { videoId: videoId } });
    toast.info("video added to playlist");
  };

  const saveToWatchLaterFun = (event: React.MouseEvent<HTMLLIElement>, videoId: string) => {
    setIsMenuOpen(false);
    setAnchorEl(null);
    dispatch({ type: "addToWatchLater", payload: { videoId: videoId } });
    toast.info("video added to watch later");
  };

  const removeFromWatchLaterFun = (event: React.MouseEvent<HTMLLIElement>, videoId: string) => {
    setIsMenuOpen(false);
    setAnchorEl(null);
    dispatch({ type: "removeFromWatchLater", payload: { videoId: videoId } });
    toast.info("video removed from watch later");
  };

  const removeFromPlaylistFun = (event: React.MouseEvent<HTMLLIElement>, videoId: string) => {
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
      }}>
      <CardMedia
        sx={{ height: 180, borderRadius: 3 }}
        image={`${videoProps?.video?.thumbnails?.[1]?.url}`}
        title={`${videoProps?.video?.title}`}
        onClick={() => handleClick(videoProps.video.videoId ?? videoProps.id)}
      />
      <CardContent sx={{ height: 105 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "secondary.main",
          }}>
          <Typography gutterBottom variant="subtitle1" sx={{ maxWidth: "70%" }}>
            {`${videoProps?.video?.title}`.slice(0, 40)}
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
            onClose={handleMenuClose}>
            {saveToWatchLater.find((item) => {
              // console.log(item);
              return item === (videoProps.video.videoId ?? videoProps.id);
            }) ? (
              <MenuItem onClick={(e) => removeFromWatchLaterFun(e, videoProps.video.videoId ?? videoProps.id)}>
                Remove from watch later
              </MenuItem>
            ) : (
              <MenuItem onClick={(e) => saveToWatchLaterFun(e, videoProps.video.videoId ?? videoProps.id)}>
                Add to watch later
              </MenuItem>
            )}
            {saveToPlayelist.find((item) => {
              // console.log(item);
              return item === (videoProps.video.videoId || videoProps.id);
            }) ? (
              <MenuItem onClick={(e) => removeFromPlaylistFun(e, videoProps.video.videoId ?? videoProps.id)}>
                Remove from playlist
              </MenuItem>
            ) : (
              <MenuItem onClick={(e) => saveToPlayListFun(e, videoProps.video.videoId ?? videoProps.id)}>
                Save to playlist
              </MenuItem>
            )}
          </Menu>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 1 }}>
          <Avatar src={videoProps?.video?.author?.avatar?.[0].url} />
          <Typography variant="body2" color="secondary.dark">
            {`${videoProps?.video?.author?.title}`}
            {<CheckCircleIcon sx={{ fontSize: ".9rem" }} />}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CoverVideoCard;
