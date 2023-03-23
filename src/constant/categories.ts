import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CodeIcon from "@mui/icons-material/Code";
import TempleHinduIcon from "@mui/icons-material/TempleHindu";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcut";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

const icons = {
  DirectionsCarIcon,
  HomeIcon,
  CodeIcon,
  HeadphonesIcon,
  TempleHinduIcon,
  SportsEsportsIcon,
  SwitchAccessShortcutIcon,
  TheaterComedyIcon,
};

interface ICategories {
  name: string;
  icon: keyof typeof icons;
}

export const categories: ICategories[] = [
  { name: "New", icon: "HomeIcon" },
  { name: "Music", icon: "HeadphonesIcon" },
  { name: "Games", icon: "SportsEsportsIcon" },
  { name: "Comedy", icon: "TheaterComedyIcon" },
  { name: "Cars", icon: "DirectionsCarIcon" },
  { name: "Bhajan", icon: "TempleHinduIcon" },
  { name: "Tech", icon: "CodeIcon" },
  { name: "Dance", icon: "SwitchAccessShortcutIcon" },
];
