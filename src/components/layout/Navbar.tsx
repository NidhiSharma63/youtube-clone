import React, { useContext, useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "auth/firebase";

import { Box, Toolbar, IconButton, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import logo from "images/logo.png";
import { searchContext } from "context/SearchProvider";
import RenderMobileView from "components/navbar/RenderMobileView";
import RenderMenu from "components/navbar/RenderMenu";
import {
  SearchStyled,
  SearchIconWrapper,
  StyledInputBase,
} from "muiStyledComponents/Navbar";

const Navbar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");
  const provider = new GoogleAuthProvider();

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

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // const handleSignIn = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

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
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
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
      <RenderMobileView
        setAnchorEl={setAnchorEl}
        handleMobileMenuClose={handleMobileMenuClose}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
      />
      <RenderMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        isMenuOpen={isMenuOpen}
      />
    </Box>
  );
};

export default Navbar;
