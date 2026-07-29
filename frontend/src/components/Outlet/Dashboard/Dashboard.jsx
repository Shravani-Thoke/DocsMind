import React, { useEffect, useState } from "react";
import SideBarNav from "../../comman/SidebarNav";
import Topbar from "../../comman/Topbar";
import axios from "../../../api/axios";

const Dashboard = () => {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get("/dashboard");

        setDashboard(response.data);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <pre>{JSON.stringify(dashboard, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;