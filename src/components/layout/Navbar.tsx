import React, { useContext, useState, useEffect } from "react";

import { Box, Toolbar, IconButton, Typography, Avatar } from "@mui/material";

import { useNavigate } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import logo from "images/logo.png";
import { searchContext } from "context/SearchProvider";
import RenderMenu from "components/navbar/RenderMenu";
import {
  SearchStyled,
  SearchIconWrapper,
  StyledInputBase,
} from "muiStyledComponents/Navbar";
import { getValueFromLS } from "utils/localstorage";
import { USER_INFO } from "constant/Misc";

const Navbar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");
  const [userProfile, setUserProfile] = useState<string>("");
  const userInfo = getValueFromLS(USER_INFO);

  const { dispatch, state } = useContext(searchContext);

  const handleSearch: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      dispatch({ type: "addSearch", payload: { value: search } });
      dispatch({ type: "addSearchCategory", payload: { value: "" } });
      navigate("/");
    }
  };

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo, "user");
      setUserProfile(JSON.parse(userInfo)?.profileUrl);
    }
  }, [userInfo]);

  useEffect(() => {
    if (state.search.length === 0) {
      setSearch("");
    }
  }, [state.search]);

  const showHomePage = (): void => {
    navigate("/");
    dispatch({ type: "addSearch", payload: { value: "" } });
    dispatch({ type: "addSearchCategory", payload: { value: "" } });

    setSearch("");
  };

  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(e.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // const userInfo = JSON.parse(getValueFromLS(USER_INFO));
  // console.log(getValueFromLS(USER_INFO));

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
        <SearchStyled>
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
        </SearchStyled>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "flex", md: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {getValueFromLS(USER_INFO) ? (
              <Avatar alt="profile" src={userProfile} />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </Box>
      </Toolbar>

      <RenderMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        isMenuOpen={isMenuOpen}
      />
    </Box>
  );
};

export default Navbar;
