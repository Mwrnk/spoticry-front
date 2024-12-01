import logotipo from "../../assets/logotipo.svg";
import user from "../../assets/user.svg";
import { logout as logoutUser } from "../../services/users";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <>
      <meta
        name="description"
        content="Spoticry - App de gerenciamento de músicas"
      />
      <meta name="keywords" content="music, streaming, playlist, spoticry" />
      <meta name="author" content="Spoticry" />
      <header
        className="bg-zinc-800 p-4 flex justify-between items-center rounded-lg m-4"
        role="banner"
      >
        <div className="flex items-center ">
          <img
            src={logotipo}
            alt="Logo"
            className="h-16 "
            aria-label="Spoticry Logo"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="bg-zinc-500 text-white px-4 py-2 rounded"
            title="Logout"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout
          </button>
          <img
            src={user}
            alt="User"
            className="h-16"
            aria-label="User Profile"
          />
        </div>
      </header>
    </>
  );
}

export default Header;
