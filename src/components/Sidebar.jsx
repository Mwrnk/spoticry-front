import home from "../assets/home.svg";
import search from "../assets/search.svg";
import library from "../assets/library.svg";

function Sidebar() {
  return (
    <aside className="w-1/5 h-screen bg-gray-600 p-5 flex flex-col">
      <nav className="flex flex-col space-y-6 mb-10">
        <a
          href="#"
          className="flex items-center space-x-3 text-lg text-gray-700 hover:text-gray-900"
        >
          <img src={home} alt="Home" className="w-6 h-6" />
          <span>Home</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 text-lg text-gray-700 hover:text-gray-900"
        >
          <img src={search} alt="Discover" className="w-6 h-6" />
          <span>Discover</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 text-lg text-gray-700 hover:text-gray-900"
        >
          <img src={library} alt="Liked Songs" className="w-6 h-6" />
          <span>Liked Songs</span>
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;