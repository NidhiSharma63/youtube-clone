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

  console.log(userAddress.profile);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // if (credential) {
        //   const token = credential.accessToken;
        // }
        // // The signed-in user info.
        // const user = result.user;
        // // IdP data available using getAdditionalUserInfo(result)
        // ...

        const value = {
          email: result.user.email,
          profileUrl: result.user.photoURL,
          displayedName: result.user.displayName,
        };
        setValueTOLS(USER_INFO, value);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handelSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("sign out");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error occured", error);
      });
  };

  // {
  Object.values(userAddress).map((val) => {
    console.log(val, "h");
  });
  // }
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
