import { Drawer, useMediaQuery } from "@mui/material";
import React from "react";
import "./AdminSideBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../component/State/Authentication/Action";

const menu = [
  { title: "Dashboard", path: "/" },
  { title: "Orders", path: "/orders" },
  { title: "Menu", path: "/menu" },
  { title: "Food Category", path: "/category" },
  { title: "Ingredients", path: "/ingredients" },
  { title: "Details", path: "/details" },
  { title: "Logout", path: "/" },
];

const AdminSideBar = ({ handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch=useDispatch(); 
  const handleNavigate = (item) => {
    navigate(`/admin/restaurant${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
    }
  };

  return (
    <div className="admin-sidebar">
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        anchor="left"
        open={true}
        onClose={handleClose}
      >
        <div className="sidebar-content">
          

          {/* Sidebar menu */}
          <div className="menu-items">
            {menu.map((item, index) => (
              <span
                onClick={() => handleNavigate(item)}
                key={index}
                className="menu-item"
              >
                {item.title}
              </span>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AdminSideBar;
