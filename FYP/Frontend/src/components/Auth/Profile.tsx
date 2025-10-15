import { useState } from "react";
import useAuthStore from "../../store/authStore";
import useAlertStore from "../../store/alertStore";
import api from "../../api/api";
import Spinner from "../Layout/Spinner";
import { LogOut } from "lucide-react";
import { Navigate } from "react-router";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuthStore();
  const { addAlert } = useAlertStore();
  const { user } = useAuthStore();

  // not signed in
  if (!user) {
    return <Navigate to="/auth/login" replace />
  }


  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.post('/auth/logout');
      logout();
      addAlert("Logged out successfully", "success");
    } catch (error) {
      addAlert("Logout failed", "error");
      return;
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <Spinner />

  return (
    <div className="px-4 pb-4">
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl w-full transition-all duration-200"
      >
        <LogOut className="mr-3 h-5 w-5" />
        Sign Out
      </button>
    </div>
  )
}

export default Profile