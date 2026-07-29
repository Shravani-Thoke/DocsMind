import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import logo from "../../assets/icon.png";
import { BookOpen, Files, LayoutDashboard, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const SidebarNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const menuItemStyles = {
    backgroundColor: "white",
    button: ({ active }) => ({
      backgroundColor: active ? "#DBEAFE" : "transparent", // Tailwind blue-100
      color: active ? "black" : "#64748b", // Tailwind blue-800
      "&:hover": {
        backgroundColor: "#F1F5F9", // Tailwind slate-100
      },
    }),
  };
  return (
    <Sidebar className="h-screen">
      <div className="h-full flex flex-col">
        <div className="p-4 font-bold text-xl flex flex-row items-center gap-3 border-b-gray-600">
          <img src={logo} alt="logo" className="h-9" />
          DocsMind AI
        </div>
        <Menu className="flex-1" menuItemStyles={menuItemStyles}>
        <MenuItem
          icon={<LayoutDashboard />}
          active={location.pathname === "/dashboard"}
          component={<Link to="/dashboard" />}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          icon={<Files />}
          active={location.pathname === "/documents"}
          component={<Link to="/documents" />}
        >
          Documents
        </MenuItem>
        <MenuItem
          icon={<BookOpen />}
          active={location.pathname === "/flashcards"}
          component={<Link to="/flashcards" />}
        >
          Flashcards
        </MenuItem>
        <MenuItem
          icon={<User />}
          active={location.pathname === "/profile"}
          component={<Link to="/profile" />}
        >
          Profile
        </MenuItem>
        </Menu>
        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem icon={<LogOut />} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
};

export default SidebarNav;
