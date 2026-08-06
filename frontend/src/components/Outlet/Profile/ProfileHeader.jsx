import { CalendarDays, Mail } from "lucide-react";
import { getAvatarGradient } from "../../../utils/avatarcolors";

const ProfileHeader = ({ user }) => {
    const initials = user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    const gradient = getAvatarGradient(user.name);

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col md:flex-row items-center gap-8">

            <div
                className={`w-28 h-28 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white text-4xl font-bold shadow-lg`}
            >
                {initials}
            </div>

            {/* User Info */}

            <div className="flex-1">

                <h2 className="text-2xl font-bold">
                    {user.name}
                </h2>

                <div className="flex items-center gap-2 text-gray-600 mt-3">
                    <Mail size={18} />
                    <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <CalendarDays size={18} />

                    <span>
                        Joined{" "}
                        {new Date(user.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>

                </div>

            </div>

        </div>
    );
};

export default ProfileHeader;