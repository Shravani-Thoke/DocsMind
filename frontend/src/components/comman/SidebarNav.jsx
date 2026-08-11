import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../../assets/icon.png";
import { BookOpen, Files, LayoutDashboard, User, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SidebarNav = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItemStyles = {
    backgroundColor: "white",
    button: ({ active }) => ({
      backgroundColor: active ? "#DBEAFE" : "transparent",
      color: active ? "black" : "#64748b",
      "&:hover": { backgroundColor: "#F1F5F9" },
    }),
  };

  const sidebar = (mobile = false) => (
    <Sidebar className="h-full" width="250px">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 p-4 text-xl font-bold">
          <img src={logo} alt="DocsMind AI logo" className="h-9" />
          <span>DocsMind AI</span>
          {mobile && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="ml-auto rounded-lg p-1 text-gray-600 hover:bg-gray-100"
            >
              <X size={22} />
            </button>
          )}
        </div>
        <Menu className="flex-1" menuItemStyles={menuItemStyles}>
          <MenuItem onClick={onClose} icon={<LayoutDashboard />} active={location.pathname === "/dashboard"} component={<Link to="/dashboard" />}>Dashboard</MenuItem>
          <MenuItem onClick={onClose} icon={<Files />} active={location.pathname === "/documents"} component={<Link to="/documents" />}>Documents</MenuItem>
          <MenuItem onClick={onClose} icon={<BookOpen />} active={location.pathname === "/flashcards"} component={<Link to="/flashcards" />}>Flashcards</MenuItem>
          <MenuItem onClick={onClose} icon={<User />} active={location.pathname === "/profile"} component={<Link to="/profile" />}>Profile</MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );

  return (
    <>
      <aside className="hidden h-screen shrink-0 md:block">{sidebar()}</aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button type="button" onClick={onClose} aria-label="Close navigation menu" className="absolute inset-0 w-full bg-black/40" />
          <aside className="relative h-full w-[250px] bg-white shadow-xl">{sidebar(true)}</aside>
        </div>
      )}
    </>
  );
};

export default SidebarNav;
