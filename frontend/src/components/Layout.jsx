
import { Outlet } from "react-router-dom";
import SidebarNav from "./comman/SidebarNav";
import Topbar from "./comman/Topbar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <SidebarNav />

      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto" style={{ backgroundColor: "#f9f9f9" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
