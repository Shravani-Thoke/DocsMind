import { useEffect, useState } from "react";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileCharts from "./ProfileCharts";
import ProfileInfo from "./ProfileInfo";
import LogoutCard from "./LogoutCard";
import api from "../../../api/axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h2 className="text-gray-500">
        Loading Profile...
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Heading */}

      <div>
        <h1 className="text-3xl font-semibold">
          My Profile
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your DocsMind account and learning statistics.
        </p>
      </div>

      {/* Header */}

      <ProfileHeader user={profile.user} />

      {/* Stats */}

      <ProfileStats stats={profile.stats} />

      {/* Charts */}

      <ProfileCharts stats={profile.stats} />

      {/* Account */}

      <ProfileInfo user={profile.user} />

      {/* Logout */}

      <LogoutCard />

    </div>
  );
};

export default Profile;