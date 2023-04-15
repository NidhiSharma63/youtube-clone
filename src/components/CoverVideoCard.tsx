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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IVideo } from "common/Interfaces";
import { PlayListVideoContext } from "context/SavedPlayList";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";
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
  const [open, setOpen] = useState<boolean>(false);
  const [playlistName, setPlayListName] = useState<string>("");
  const { videoProps, width } = props;

  const { state, dispatch } = useContext(PlayListVideoContext);
  // console.log(videoProps, "video props");

  const playListContainer = useRef<HTMLElement | null>(null);
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

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target !== null) {
      if ((e.target as HTMLElement).tagName === "DIV") {
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const createPlayList = (e: any) => {
    e.stopPropagation();
    // console.log("I RUN");
    if (playlistName.length === 0) {
      setOpen(false);
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
    toast("n");
  };

  const handleClickOnPlaylist = (e: any) => {
    if (e.target.type === "checkbox") {
      // console.log("should run", e.target.checked, videoProps.id);
      if (e.target.checked) {
        dispatch({
          type: "videoAddToPlayList",
          payload: {
            playListName: e.target.value,
            videoId: videoProps.id.videoId ?? videoProps.id,
          },
        });
      }
      if (!e.target.checked) {
        dispatch({
          type: "removeVideoFromPlaylist",
          payload: {
            playListName: e.target.value,
            videoId: videoProps.id.videoId ?? videoProps.id,
          },
        });
      }
    }
    e.target.checked = !e.target.checked;
  };

  // useEffect(() => {}, [addToPlayList]);

  return (
    <>
      <Dialog open={open} maxWidth={"xs"} onClose={() => setIsMenuOpen(false)}>
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
                {state.playListVideo.map((item, i) => {
                  return (
                    <FormControlLabel
                      key={i}
                      value={item.playListName}
                      control={
                        <Checkbox
                          checked={
                            item?.videoId?.includes(
                              videoProps?.id?.videoId ?? videoProps?.id
                            ) || false
                          }
                        />
                      }
                      onClick={handleClickOnPlaylist}
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
