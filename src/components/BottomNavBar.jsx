// src/components/BottomNavBar.jsx
import React, { useState } from "react";
import homeIcon from "../assets/home.svg";
import searchIcon from "../assets/search.svg";
import moreIcon from "../assets/more.svg";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

function BottomNavBar({ songs }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => setIsSearchActive(!isSearchActive);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-3 md:hidden z-10">
      <button
        onClick={() => setIsSearchActive(false)}
        className="flex flex-col items-center"
      >
        <img src={homeIcon} alt="Home" className="h-6" />
        <span className="text-xs">Home</span>
      </button>

      <button onClick={toggleSearch} className="flex flex-col items-center">
        <img src={searchIcon} alt="Search" className="h-6" />
        <span className="text-xs">Search</span>
      </button>

      <button className="flex flex-col items-center">
        <img src={moreIcon} alt="More" className="h-6" />
        <span className="text-xs">More</span>
      </button>

      {isSearchActive && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-20 flex flex-col items-center">
          <div className="w-full px-4 flex justify-between items-center mt-4">
            <button
              onClick={() => setIsSearchActive(false)}
              className="text-white bg-gray-700 px-4 py-2 rounded-lg"
            >
              Retornar
            </button>
            <SearchBar
              placeholder="Pesquisar músicas..."
              onSearch={setSearchQuery}
            />
          </div>
          <div className="w-full px-4 mt-4">
            <SearchResults
              searchQuery={searchQuery}
              songs={songs}
              onClearSearch={() => setSearchQuery("")}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BottomNavBar;
