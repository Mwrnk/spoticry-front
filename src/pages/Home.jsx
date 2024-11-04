// Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlaylists, fetchSongs } from "../services/api";
import SidebarPlaylists from "../components/SidebarPlaylists";
import TrendingPlaylists from "../components/TrendingPlaylists";
import SongsList from "../components/SongsList";
import Header from "../components/Header";

function Home() {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
    <div className="flex flex-col h-screen">
      <Header onLogout={handleLogout} />
      <div className="flex flex-1">
        <SidebarPlaylists playlists={playlists} />
        <div className="flex-1 p-4 overflow-y-auto">
          <TrendingPlaylists playlists={playlists} />
          <SongsList songs={songs} />
        </div>
      </div>
    </div>
  );
}

export default Home;
