import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSongs } from "../services/songService";
import Sidebar from "../components/Layout/Sidebar";
import SongsList from "../components/Song/SongsList";
import Header from "../components/Layout/Header";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import LoadingSpinner from "../components/LoadingSpinner";

function Discover() {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        setError(null);

        const [songsData] = await Promise.all([fetchSongs()]);

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
    refreshSongs();
  };

  const clearSearch = () => {
    setSearchQuery("");
    refreshSongs();
  };

  const refreshSongs = async () => {
    try {
      const songsData = await fetchSongs();
      if (Array.isArray(songsData)) {
        setSongs(songsData);
      } else {
        setError("Erro ao carregar músicas atualizadas");
      }
    } catch (err) {
      setError("Erro ao atualizar músicas. Por favor, tente novamente.");
    }
  };

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header onLogout={handleLogout} />
      <main className="flex overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <SearchBar
                onSearch={handleSearch}
                placeholder={"Pesquisar músicas..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <h1 className="text-4xl p-4 m-8 text-white ">Todas as Músicas</h1>
              {searchQuery ? (
                <SearchResults
                  searchQuery={searchQuery}
                  songs={songs}
                  onClearSearch={clearSearch}
                />
              ) : (
                <SongsList songs={songs} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Discover;
