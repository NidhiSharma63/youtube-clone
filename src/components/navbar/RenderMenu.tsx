import { Menu, MenuItem } from "@mui/material";

interface IRenderMenu {
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
}
const RenderMenu = ({ anchorEl, isMenuOpen, handleMenuClose }: IRenderMenu) => {
  return (
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
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={handleMenuClose}>Add account</MenuItem>
    </Menu>
  );
};

export default RenderMenu;
