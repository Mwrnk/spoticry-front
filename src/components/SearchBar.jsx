// src/components/SearchBar.jsx
import search from "../assets/search.svg";
function SearchBar({ placeholder, onSearch, value }) {
  return (
    <div className="relative flex items-center">
      <img
        src={search}
        alt="search icon"
        className="absolute left-3 w-6 h-6 text-gray-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className="pl-12 pr-4 py-3 mx-2 rounded-xl bg-zinc-800 font-thin text-xl text-white focus:outline-none focus:ring-2 focus:ring-custom-blue"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
