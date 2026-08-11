
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SidebarNav from "./comman/SidebarNav";
import Topbar from "./comman/Topbar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <SidebarNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6" style={{ backgroundColor: "#f9f9f9" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
