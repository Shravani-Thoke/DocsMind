import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { User } from "lucide-react";
import { getAvatarGradient } from "../../utils/avatarcolors";

const Topbar = () => {
 
  const { user, loading } = useContext(AuthContext);

   const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

    const gradient = getAvatarGradient(user.name);

  console.log(user);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full border-b border-gray-400 py-2 flex justify-end flex-row">
      <div className="mr-2 p-1">
        {user.avatar ? (
          <div className=" h-11 w-11 rounded-2xl flex justify-center items-center">
            <img src={user.avatar} alt="img" className="object-cover"/>
          </div>
        ) : (
          <div className={`h-11 w-11 font-semibold text-white rounded-full bg-gradient-to-r ${gradient} flex justify-center items-center`}>
            {initials}
          </div>
        )}
      </div>
      <div className="mr-10 p-1">
          {user && (
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          )}
        </div>
    </div>
  );
};

export default Topbar;
