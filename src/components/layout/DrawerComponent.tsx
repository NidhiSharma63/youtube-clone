import { useState, MouseEventHandler, useEffect } from "react";
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

import { Outlet } from "react-router-dom";
import customAxiosRequest from "constant/customAxiosRequest";
import { BASE_URL } from "constant/Misc";
import { useQuery } from "@tanstack/react-query";

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
  const [selectedCategories, setSelectedCategories] = useState<string>("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const queryFunction = () => {
    console.log(selectedCategories, "jj");
    return customAxiosRequest(
      `${BASE_URL}/search?part=snippet&q=${selectedCategories}`
    );
  };

  const { refetch } = useQuery({
    queryKey: ["AllVideos"],
    queryFn: queryFunction,
    // staleTime: 1000 * 60 * 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: false,
  });
  useEffect(() => {
    if (selectedCategories) {
      console.log(selectedCategories);
      refetch();
    }
  }, [selectedCategories]);

  const handleCategories = (name: string) => {
    // console.log(name);
    setSelectedCategories(name);
    // refetch();
    // Code to handle the click event goes here
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
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
        </List>
        {/* <Divider /> */}
      </MuiDrawer>
      <Main open={open} sx={{ p: 0 }}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
