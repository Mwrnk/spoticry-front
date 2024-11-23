// src/components/SearchBar.jsx
function SearchBar({ placeholder, onSearch, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      className="mx-2 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;
