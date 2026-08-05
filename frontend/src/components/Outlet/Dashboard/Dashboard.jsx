import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

import StatCard from "./StatCard";
import RecentDocumentCard from "./RecentDocumentCard";

import {
  HiOutlineDocumentText,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
} from "react-icons/hi";

import { FaRegClock } from "react-icons/fa6"

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/dashboard");
        setDashboard(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <p className="text-gray-500">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div>

      {/* Heading */}

      <div>

        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Track your learning progress and activity
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        <StatCard
          title="Total Documents"
          value={dashboard.stats.totalDocuments}
          icon={<HiOutlineDocumentText size={28} />}
          iconBg="bg-blue-500"
        />

        <StatCard
          title="Total Flashcards"
          value={dashboard.stats.totalFlashcards}
          icon={<HiOutlineBookOpen size={28} />}
          iconBg="bg-pink-500"
        />

        <StatCard
          title="Total Quizzes"
          value={dashboard.stats.totalQuizzes}
          icon={<HiOutlineAcademicCap size={28} />}
          iconBg="bg-green-500"
        />

      </div>

      {/* Recent Documents */}

      <div className="bg-white mt-8 rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-medium">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">

              <FaRegClock
                size={20}
                className="text-gray-900"
              />

            </div>
            Recent Documents
          </div>
        </h2>

        <div className="mt-6 space-y-4">

          {dashboard.recentDocuments.length > 0 ? (
            dashboard.recentDocuments.map((doc) => (
              <RecentDocumentCard
                key={doc._id}
                doc={doc}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              No recent documents found.
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;