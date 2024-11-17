import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import UserPlaylists from "../components/UsersPlaylist";
import add from "../assets/add.svg";
import AddPlaylistModal from "../components/AddPlaylistModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../services/api";
import { getTokenData } from "../services/getTokenData";

function Playlists() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = getTokenData(token)?.id;

  const [playlists, setPlaylists] = useState([]);
  const [playlistCovers, setPlaylistCovers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/playlist/user/${userId}/playlists`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const playlistsData = response.data.playlists;
      setPlaylists(playlistsData);

      const covers = {};
      playlistsData.forEach((playlist) => {
        const cover = localStorage.getItem(`playlist-cover-${playlist._id}`);
        if (cover) {
          covers[playlist._id] = cover;
        }
      });
      setPlaylistCovers(covers);
    } catch (error) {
      console.error("Erro ao buscar playlists do usuário:", error);
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`${BASE_URL}/playlist/${playlistId}`, {
        headers: {
          Authorization: token,
        },
      });
      setPlaylists(playlists.filter((playlist) => playlist._id !== playlistId));
    } catch (error) {
      console.error("Erro ao deletar playlist:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPlaylists();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatePlaylist = async () => {
    await fetchPlaylists();
    setIsModalOpen(false);
  };

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header onLogout={handleLogout} />
      <main className="flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-start my-4 py-2 space-x-8">
            <h1 className="text-2xl font-bold">Suas Playlists</h1>
            <button
              className="py-2 px-2 bg-blue-500 text-white rounded-lg"
              onClick={openModal}
            >
              <img src={add} alt="add" />
            </button>
          </div>
          <UserPlaylists
            playlists={playlists}
            covers={playlistCovers}
            onDelete={handleDeletePlaylist}
          />
          <AddPlaylistModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onCreatePlaylist={handleCreatePlaylist}
          />
        </div>
      </main>
    </div>
  );
}

export default Playlists;
