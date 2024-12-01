import { Link } from "react-router-dom";
import home from "../../assets/home.svg";
import search from "../../assets/search.svg";
import library from "../../assets/library.svg";
import musicnote from "../../assets/musicnote.svg";

function Sidebar() {
  return (
    <aside
      className="w-1/5 h-screen bg-zinc-800 p-5 flex flex-col rounded-lg m-4"
      aria-label="Sidebar"
    >
      <nav
        className="flex flex-col space-y-6 mb-10"
        aria-label="Main navigation"
      >
        <Link
          to="/home"
          className="flex items-center space-x-3 text-xl font-thin text-zinc-100 hover:text-white hover:font-semibold transform transition-transform duration-200 hover:scale-105"
          aria-label="Home"
        >
          <img src={home} alt="Home" className="w-6 h-6" />
          <span>Home</span>
        </Link>
        <Link
          to="/discover"
          className="flex items-center space-x-3 text-xl font-thin text-zinc-100 hover:text-white hover:font-semibold transform transition-transform duration-200 hover:scale-105"
          aria-label="Discover"
        >
          <img src={search} alt="Descobrir" className="w-6 h-6" />
          <span>Descobrir</span>
        </Link>
        <Link
          to="/songs"
          className="flex items-center space-x-3 text-xl font-thin text-zinc-100 hover:text-white hover:font-semibold transform transition-transform duration-200 hover:scale-105"
          aria-label="Songs"
        >
          <img src={musicnote} alt="Músicas" className="w-6 h-6" />
          <span>Músicas</span>
        </Link>
        <Link
          to="/playlists"
          className="flex items-center space-x-3 text-xl font-thin text-zinc-100 hover:text-white hover:font-bold transform transition-transform duration-200 hover:scale-105"
          aria-label="Playlists"
        >
          <img src={library} alt="Playlists" className="w-6 h-6" />
          <span>Playlists</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
