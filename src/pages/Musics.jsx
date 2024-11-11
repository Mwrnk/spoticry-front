import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { fetchSongs } from "../services/api";
import SongsList from "../components/SongsList";

function Musics() {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSongs();
      setSongs(data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="flex overflow-hidden ">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-4">
          <SearchBar
            searchQuery={searchQuery}
            placeholder="Pesquisar em suas músicas..."
            onSearch={handleSearch}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <h1 className="text-2xl font-bold">Suas musicas</h1>
          {searchQuery ? (
            <SearchResults
              searchQuery={searchQuery}
              songs={songs}
              onClearSearch={clearSearch}
            />
          ) : (
            <SongsList songs={songs} />
          )}
        </div>
      </main>
    </div>
  );
}

export default Musics;
