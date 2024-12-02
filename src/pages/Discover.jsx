import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSongs } from "../services/songService";
import Sidebar from "../components/Layout/Sidebar";
import SongsList from "../components/Song/SongsList";
import Header from "../components/Layout/Header";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import LoadingSpinner from "../components/LoadingSpinner";
import seta from "../assets/seta.svg";
function Discover() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
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

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
              <div className="flex items-center mb-4">
                <SearchBar
                  onSearch={handleSearch}
                  placeholder={"Pesquisar músicas..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={handleSortOrderChange}
                  className="ml-4 p-2 bg-zinc-800 text-white rounded-xl transform transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  <img
                    src={seta}
                    alt="Seta"
                    className={`h-8 w-8 inline transform transition-transform duration-300 ${
                      sortOrder === "asc" ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              <h1 className="text-4xl m-4 pb-6 text-white font-bold ">
                Todas as Músicas
              </h1>
              {searchQuery ? (
                <SearchResults
                  searchQuery={searchQuery}
                  songs={songs}
                  onClearSearch={clearSearch}
                />
              ) : (
                <SongsList songs={songs} sortOrder={sortOrder} hideSortButton />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Discover;
