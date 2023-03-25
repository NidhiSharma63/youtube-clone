import React from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getValueFromLS } from "utils/localstorage";
import { USER_INFO } from "constant/Misc";

interface IRenderMobileView {
  handleMobileMenuClose: () => void;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  mobileMoreAnchorEl: HTMLElement | null;
}

const RenderMobileView = ({
  handleMobileMenuClose,
  setAnchorEl,
  mobileMoreAnchorEl,
}: IRenderMobileView) => {
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {getValueFromLS(USER_INFO) ? (
        <MenuItem onClick={handleProfileMenuOpen}>No uder</MenuItem>
      ) : (
        <MenuItem onClick={handleProfileMenuOpen}>
          {/* <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <AccountCircle />
          </IconButton> */}

          {/* <p>Profile</p> */}
        </MenuItem>
      )}
    </Menu>
  );
};

export default RenderMobileView;
