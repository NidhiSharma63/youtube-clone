import { useState, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import MuiDrawer from "muiStyledComponents/Drawer";
import Navbar from "components/layout/Navbar";
import { categories } from "constant/categories";
import { icons } from "assets";

import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { searchContext } from "context/SearchProvider";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { PlayListVideoContext } from "context/SavedPlayList";

interface ICategories {
  name: string;
  icon: keyof typeof icons;
}

const drawerWidth = 190;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(searchContext);
  const navigate = useNavigate();
  const { state } = useContext(PlayListVideoContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCategories = (name: string) => {
    dispatch({ type: "addSearchCategory", payload: { value: name } });
    dispatch({ type: "addSearch", payload: { value: "" } });
    navigate("/");
  };

  const moveToPlayList = () => {
    navigate("/playlist");
  };
  const moveToWatchLater = () => {
    navigate("/watchlater");
  };

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "1440px",
        position: "relative",
        // border: "1px solid red",
        margin: "auto",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          maxWidth: "1440px",
          margin: "auto",
          left: `${open ? drawerWidth : 0}`,
        }}
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 1,
              ...(open && { display: "none" }),

              ml: "-1rem",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Navbar />
        </Toolbar>
      </AppBar>
      <MuiDrawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ color: "secondary.main" }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {categories.map((item: ICategories) => {
            const Icon = icons[item.icon];
            return (
              <ListItem
                key={item.name}
                disablePadding
                onClick={() => handleCategories(item.name)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Icon sx={{ color: "secondary.main" }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "secondary.main" }}
                    primary={item.name}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
          {state.playListVideo.map((item) => {
            console.log(item.playListName, "item");

            return (
              <ListItem disablePadding onClick={() => moveToWatchLater()}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    {item.playListName === "watch later" ? (
                      <AccessTimeIcon />
                    ) : (
                      <SmartDisplayIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "secondary.main" }}
                    primary={item.playListName}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        {/* <Divider /> */}
      </MuiDrawer>
      <Main
        open={open}
        sx={{
          p: 0,
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
