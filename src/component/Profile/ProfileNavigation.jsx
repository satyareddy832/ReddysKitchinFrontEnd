import { Divider, Drawer, useMediaQuery } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../State/Authentication/Action";

const menu = [
  { title: "Orders" },
  { title: "Favorites" },
  { title: "Address" },
  { title: "Payment" },
  { title: "Notification" },
  { title: "Events" },
  { title: "Logout" },
];

const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title == "Logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`${item.title.toLowerCase()}`);
    }
  };

  return (
    <Drawer
      onClose={handleClose}
      open={open}
      sx={{
        marginTop: "64px", // Adjust this value based on your Navbar height
        width: "240px", // Set a specific width for the Drawer
        flexShrink: 0, // Ensure Drawer does not shrink
        "& .MuiDrawer-paper": {
          marginTop: "67px", // Push content below the Navbar
          width: "240px", // Set a specific width for the Drawer paper
        },
      }}
      variant={isSmallScreen ? "temporary" : "permanent"}
    >
      <div style={menuContainerStyle}>
        {menu.map((item, i) => (
          <div
            onClick={() => handleNavigate(item)}
            key={i}
            style={menuItemStyle}
          >
            <span>{item.title}</span>
            {i !== menu.length - 1 && <Divider style={dividerStyle} />}
          </div>
        ))}
      </div>
    </Drawer>
  );
};

const menuContainerStyle = {
  padding: "20px",
  backgroundColor: "black",
  width: "500px", // Adjust width as needed
};

const menuItemStyle = {
  marginBottom: "45px",
  fontSize: "18px",
};

const dividerStyle = {
  margin: "8px 0",
};

export default ProfileNavigation;
