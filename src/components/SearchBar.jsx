// src/components/SearchBar.jsx
function SearchBar({ placeholder, onSearch }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-1/4 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => onSearch(e.target.value)} // Lida com a busca
    />
  );
}

export default SearchBar;
