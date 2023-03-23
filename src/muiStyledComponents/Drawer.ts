import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

const drawerWidth = 240;

const MuiDrawer = styled(Drawer)(() => ({
  width: drawerWidth - 50,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth - 50,
    boxSizing: "border-box",
    backgroundColor: "#0F0F0F",
  },
}));

export default MuiDrawer;
