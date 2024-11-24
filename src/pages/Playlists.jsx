import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import PlaylistsContainer from "../components/Playlist/PlaylistsContainer";
import PlaylistDetails from "../components/Playlist/PlaylistDetails";

import { UserContext } from "../context/userContext";
import { fetchUserPlaylists } from "../services/playlistService";

function Playlists() {
  const navigate = useNavigate();
  const { userId, token } = useContext(UserContext);
  const [playlists, setPlaylists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortEnabled, setIsSortEnabled] = useState(false);

  const fetchPlaylists = async () => {
    try {
      const { playlists } = await fetchUserPlaylists(userId, token);
      setPlaylists(playlists);
    } catch (error) {
      toast.error("Erro ao buscar playlists do usuário");
      console.error("Erro ao buscar playlists do usuário:", error);
    }
  };

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleClosePlaylist = () => {
    setSelectedPlaylist(null);
    fetchPlaylists();
  };

  useEffect(() => {
    if (userId && token) {
      fetchPlaylists();
    }
  }, [userId, token]);

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
    try {
      await fetchPlaylists();
      setIsModalOpen(false);
      toast.success("Playlist criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar playlist");
    }
  };

  const handleSavePlaylist = async () => {
    try {
      await fetchPlaylists();
      setIsModalOpen(false);
      toast.success("Playlist salva com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar playlist");
    }
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist._name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortToggle = () => {
    setIsSortEnabled(!isSortEnabled);
  };

  const sortedPlaylists = isSortEnabled
    ? [...filteredPlaylists].sort((a, b) => a._name.localeCompare(b._name))
    : filteredPlaylists;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header onLogout={handleLogout} />
      <main className="flex overflow-hidden">
        <Sidebar />
        {!selectedPlaylist && (
          <>
            <PlaylistsContainer
              playlists={sortedPlaylists}
              searchQuery={searchQuery}
              onSearch={handleSearch}
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              openModal={openModal}
              handleCreatePlaylist={handleCreatePlaylist}
              handleSavePlaylist={handleSavePlaylist}
              onSelect={handlePlaylistSelect}
              isSortEnabled={isSortEnabled}
              onSortToggle={handleSortToggle}
            />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </>
        )}
        {selectedPlaylist && (
          <PlaylistDetails
            selectedPlaylist={selectedPlaylist}
            onClose={handleClosePlaylist}
            token={token}
          />
        )}
      </main>
    </div>
  );
}

export default Playlists;
