import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";


const drawerWidth = 240;

const MuiDrawer = styled(Drawer)(()=>({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor:'#03091B !important',
  },
}));

export default MuiDrawer;