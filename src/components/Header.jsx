import logo from "../assets/logo.svg";
import user from "../assets/user.svg";
import { logout as logoutUser } from "../services/users";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8" />
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          title="Logout"
          onClick={handleLogout}
        >
          Logout
        </button>
        <img src={user} alt="User" className="h-8" />
      </div>
    </header>
  );
}

export default Header;
