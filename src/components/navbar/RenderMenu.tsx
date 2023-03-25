import { Menu, MenuItem } from "@mui/material";
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getValueFromLS, setValueTOLS } from "utils/localstorage";

import { auth } from "auth/firebase";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { USER_INFO } from "constant/Misc";

interface IRenderMenu {
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
}

interface IUserAddress {
  email: string | null;
  profile: string | null;
}

const RenderMenu = ({ anchorEl, isMenuOpen, handleMenuClose }: IRenderMenu) => {
  const provider = new GoogleAuthProvider();
  const userInfo = getValueFromLS(USER_INFO);

  const [userAddress, setUserAddress] = useState<IUserAddress>({
    email: "",
    profile: "",
  });

  useEffect(() => {
    if (userInfo) {
      setUserAddress({
        email: JSON.parse(userInfo).email,
        profile: JSON.parse(userInfo).profileUrl,
      });
    }
  }, [userInfo]);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const value = {
          email: result.user.email,
          profileUrl: result.user.photoURL,
          displayedName: result.user.displayName,
        };
        setValueTOLS(USER_INFO, value);
        handleMenuClose();
      })
      .catch((error) => {
        console.log(error);
        alert("An Error Occured");
      });
  };

  const handelSignOut = async () => {
    try {
      signOut(auth);
      const value = {
        email: "",
        profileUrl: "",
        displayedName: "",
      };
      setValueTOLS(USER_INFO, value);
      setUserAddress({ email: "", profile: "" });
      handleMenuClose();
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  return (
    <>
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}

      {userAddress.email && userAddress.profile ? (
        // [
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
          <MenuItem sx={{ justifyContent: "center", display: "flex" }}>
            <Avatar alt="profile" src={userAddress.profile} />
          </MenuItem>
          <MenuItem sx={{ justifyContent: "center", display: "flex" }}>
            {userAddress.email}
          </MenuItem>
          <MenuItem
            sx={{ justifyContent: "center", display: "flex" }}
            onClick={handelSignOut}
          >
            Sign out
          </MenuItem>
        </Menu>
      ) : (
        // ]
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
          <MenuItem onClick={handleSignIn}>Add account</MenuItem>
        </Menu>
      )}
    </>
  );
};

export default RenderMenu;
