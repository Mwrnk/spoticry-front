// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlaylists, fetchSongs } from "../services/api";
import SidebarPlaylists from "../components/SidebarPlaylists";
import TrendingPlaylists from "../components/TrendingPlaylists";
import SongsList from "../components/SongsList";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import SearchResults from "../components/SearchResults";
function Home() {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [playlistsData, songsData] = await Promise.all([
          fetchPlaylists(),
          fetchSongs(),
        ]);

        if (Array.isArray(playlistsData)) {
          setPlaylists(playlistsData);
        } else {
          setError("Erro ao carregar playlists");
        }

        if (Array.isArray(songsData)) {
          setSongs(songsData);
        } else {
          setError("Erro ao carregar músicas");
        }
      } catch (err) {
        setError("Erro ao carregar dados. Por favor, tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header onLogout={handleLogout} onSearch={handleSearch} />
      <main className="flex overflow-hidden">
        <SidebarPlaylists playlists={playlists} />
        <div className="flex-1 overflow-y-auto p-4">
          {searchQuery ? (
            <SearchResults
              searchQuery={searchQuery}
              songs={songs}
              onClearSearch={clearSearch}
            />
          ) : (
            <>
              <TrendingPlaylists playlists={playlists} />
              <SongsList songs={songs} />
            </>
          )}
        </div>
      </main>
      <BottomNavBar playlists={playlists} songs={songs} />
    </div>
  );
}

export default Home;
