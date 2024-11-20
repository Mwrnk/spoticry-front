import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PlaylistsContainer from "../components/PlaylistsContainer";
import PlaylistDetails from "../components/PlaylistDetails";

import { UserContext } from "../context/userContext";
import { fetchUserPlaylists } from "../services/playlistService";

function Playlists() {
  const navigate = useNavigate();
  const { userId, token } = useContext(UserContext);
  const [playlists, setPlaylists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const fetchPlaylists = async () => {
    try {
      const { playlists } = await fetchUserPlaylists(userId, token);
      setPlaylists(playlists);
    } catch (error) {
      console.error("Erro ao buscar playlists do usuário:", error);
    }
  };

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleClosePlaylist = () => {
    setSelectedPlaylist(null);
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
        {!selectedPlaylist && (
          <PlaylistsContainer
            playlists={playlists}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            openModal={openModal}
            handleCreatePlaylist={handleCreatePlaylist}
            onSelect={handlePlaylistSelect}
          />
        )}
        {selectedPlaylist && (
          <PlaylistDetails
            selectedPlaylist={selectedPlaylist}
            onClose={handleClosePlaylist}
          />
        )}
      </main>
    </div>
  );
}

export default Playlists;
