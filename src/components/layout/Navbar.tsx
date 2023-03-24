import React, { useContext, useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import logo from "images/logo.png";
import { searchContext } from "context/SearchProvider";
import customAxiosRequest from "constant/customAxiosRequest";
import { BASE_URL } from "constant/Misc";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(-2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar: React.FC = (): JSX.Element => {
  const naviagte = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");

  const { dispatch, state } = useContext(searchContext);

  const handleSearch: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      dispatch({ type: "addSearch", payload: { value: search } });
      dispatch({ type: "addSearchCategory", payload: { value: "" } });
    }
  };

  const queryFunction = () => {
    return customAxiosRequest(`${BASE_URL}/search?part=snippet&q=`);
  };

  useEffect(() => {
    if (state.search.length === 0) {
      setSearch("");
    }
  }, [state.search]);

  const { refetch } = useQuery({
    queryKey: ["AllVideos"],
    queryFn: queryFunction,
    // staleTime: 1000 * 60 * 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: false,
  });

  const showHomePage = (): void => {
    naviagte("/");
    dispatch({ type: "addSearch", payload: { value: "" } });
    refetch();
    setSearch("");
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, boxShadow: 0 }}>
      <Toolbar>
        <Box
          onClick={showHomePage}
          sx={{
            cursor: "pointer",
            marginLeft: "-1rem",
            marginRight: "2rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: "40px",
              cursor: "pointer",
            }}
          />
          <Typography sx={{ display: { xs: "none", sm: "flex" } }} variant="h6">
            Youtube
          </Typography>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onKeyUp={handleSearch}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        {/* <Box sx={{ display: { xs: "flex", md: "none" }, mr: "-2rem" }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box> */}
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
