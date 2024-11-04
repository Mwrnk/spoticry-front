// src/components/Header.jsx
import logo from "../assets/logo.svg";
import user from "../assets/user.svg";

function Header({ onLogout }) {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8" />
      </div>
      <div className="flex-1 mx-4 hidden md:flex justify-center">
        <input
          type="text"
          placeholder="O que você quer ouvir hoje?"
          className="w-1/4 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center">
        <button
          onClick={onLogout}
          className="py-2 px-4 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
        <button className="text-white ml-4">
          <img src={user} alt="User" className="h-8" />
        </button>
      </div>
    </header>
  );
}

export default Header;
