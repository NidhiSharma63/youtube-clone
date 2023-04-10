import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IVideo } from "common/Interfaces";
import { SavedVideoContext } from "context/SavedVideoProvider";
import { PlayListVideoContext } from "context/SavedPlayList";
import { toast } from "react-toastify";
import ListIcon from "@mui/icons-material/List";
import ReactDOM from "react-dom";
interface IProps {
  videoProps: IVideo;
  width: {
    maxWidth?: number;
    width?: number;
  };
}

const CoverVideoCard = (props: IProps) => {
  // const playListFromLS = getValueFromLS(USER_PLAYLIST);

  // if (playListFromLS) {
  //   const parsePlayListVideoFromLS = JSON.parse(playListFromLS);
  //   const playListVideo = JSON.parse(
  //     parsePlayListVideoFromLS.savedPlayListValueArray
  //   );

  //   // console.log(playListVideo);
  // }
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [playlistName, setPlayListName] = useState<string>("");
  const [addToPlayList, setAddToPlaylist] = useState(false);
  // const { state, dispatch } = useContext(SavedVideoContext);
  const { videoProps, width } = props;
  // const { saveToWatchLater, saveToPlayelist } = state;

  const { state, dispatch } = useContext(PlayListVideoContext);

  const playListContainer = useRef<HTMLElement | null>(null);
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

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target !== null) {
      if ((e.target as HTMLElement).tagName === "DIV") {
        setOpen(false);
      }
    }
  };

  console.log(state.playListVideo);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const createPlayList = () => {
    if (playlistName.length === 0) {
      setAddToPlaylist(true);
      return;
    }
    const newPlayList = (
      <FormControlLabel
        value="playlistName"
        control={<Checkbox checked={true} />}
        label={playlistName}
      />
    );

    if (playListContainer.current) {
      const container = document.createElement("div");
      ReactDOM.render(newPlayList, container);
      playListContainer.current.appendChild(container.firstChild as Node);
      dispatch({
        type: "createNewPlayList",
        payload: { playListName: playlistName, videoId: videoProps.id.videoId },
      });

      setPlayListName("");
    }
    setOpen(false);
  };

  const addToPlaylist = (val: string) => {
    if (addToPlayList) {
      dispatch({
        type: "videoAddToPlayList",
        payload: { playListName: val, videoId: videoProps.id.videoId },
      });
    }
    setAddToPlaylist(false);
  };

  return (
    <>
      <Dialog
        open={open}
        // sx={{ width: "300px" }}
        maxWidth={"xs"}
        onClose={() => setIsMenuOpen(false)}
      >
        <DialogTitle>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="your playlist"
            type="text"
            value={playlistName}
            onChange={(e) => setPlayListName(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <Box
                ref={playListContainer}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormControlLabel
                  value="Watch later"
                  control={<Checkbox />}
                  label="Watch later"
                  onClick={() => addToPlaylist("Watch later")}
                />
                {state.playListVideo.map((item) => {
                  return (
                    <FormControlLabel
                      value={item.playListName}
                      control={<Checkbox />}
                      onClick={() => addToPlaylist(item.playListName)}
                      label={item.playListName}
                    />
                  );
                })}
              </Box>
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button onClick={createPlayList}>Create playlist</Button>
        </DialogActions>
      </Dialog>
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
            <Typography
              gutterBottom
              variant="subtitle1"
              sx={{ maxWidth: "70%" }}
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
              <MenuItem onClick={() => setOpen(true)}>Add to PlayList</MenuItem>
            </Menu>
          </Box>
          <Typography variant="body2" color="secondary.dark">
            {`${videoProps?.snippet?.channelTitle}`}
            {<CheckCircleIcon sx={{ fontSize: ".9rem" }} />}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default CoverVideoCard;
