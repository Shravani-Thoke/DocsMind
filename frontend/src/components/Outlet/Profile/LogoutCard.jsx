import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, LogOut } from "lucide-react";

const LogoutCard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="flex items-start gap-4">

        <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
          <AlertTriangle
            className="text-red-600"
            size={28}
          />
        </div>

        <div className="flex-1">

          <h2 className="text-xl font-semibold">
            Account Actions
          </h2>

          <p className="text-gray-500 mt-1">
            Logging out will end your current session.
            You can sign in again anytime.
          </p>

        </div>

      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 cursor-pointer"
      >
        <LogOut size={20} />
        Logout
      </button>

    </div>
  );
};

export default LogoutCard;