import { Link } from "react-router-dom";
import home from "../assets/home.svg";
import search from "../assets/search.svg";
import library from "../assets/library.svg";

function Sidebar() {
  return (
    <aside className="w-1/5 h-screen bg-gray-600 p-5 flex flex-col">
      <nav className="flex flex-col space-y-6 mb-10">
        <Link
          to="/home"
          className="flex items-center space-x-3 text-lg text-gray-700 hover:text-gray-900"
        >
          <img src={home} alt="Home" className="w-6 h-6" />
          <span>Home</span>
        </Link>
        <Link
          to="/discover"
          className="flex items-center space-x-3 text-lg text-gray-700 hover:text-gray-900"
        >
          <img src={search} alt="Descobrir" className="w-6 h-6" />
          <span>Descobrir</span>
        </Link>
        <Link
          to="/musics"
          className="flex items-center space-x-3 text-lg text-gray-700 hover:text-gray-900"
        >
          <img src={library} alt="Músicas" className="w-6 h-6" />
          <span>Músicas</span>
        </Link>
        <Link
          to="/playlists"
          className="flex items-center space-x-3 text-lg text-gray-700 hover:text-gray-900"
        >
          <img src={library} alt="Playlists" className="w-6 h-6" />
          <span>Playlists</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
