import {
  User,
  Mail,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

const ProfileInfo = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Account Information
      </h2>

      <div className="space-y-5">

        {/* Name */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <User className="text-blue-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <h3 className="font-semibold">
                {user.name}
              </h3>
            </div>

          </div>

        </div>

        {/* Email */}

        <div className="flex items-center justify-between ">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Mail className="text-green-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email Address
              </p>

              <h3 className="font-semibold">
                {user.email}
              </h3>
            </div>

          </div>

        </div>

        {/* Joined */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <CalendarDays className="text-purple-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Member Since
              </p>

              <h3 className="font-semibold">
                {new Date(user.createdAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </h3>
            </div>

          </div>

        </div>

        {/* Account Status */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <ShieldCheck className="text-emerald-600" size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Account Status
              </p>

              <h3 className="font-semibold text-emerald-600">
                Active
              </h3>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileInfo;