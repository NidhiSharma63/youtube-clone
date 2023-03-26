import { icons } from "assets";

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
  { name: "Wacth Later", icon: "AccessTimeIcon" },

  { name: "Your Videos", icon: "SmartDisplayIcon" },
];
