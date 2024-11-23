import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PlaylistsContainer from "../components/PlaylistsContainer";
import PlaylistDetails from "../components/PlaylistDetails";
import SearchBar from "../components/SearchBar";

import { UserContext } from "../context/userContext";
import { fetchUserPlaylists } from "../services/playlistService";

function Playlists() {
  const navigate = useNavigate();
  const { userId, token } = useContext(UserContext);
  const [playlists, setPlaylists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    await fetchPlaylists();
    setIsModalOpen(false);
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist._name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header onLogout={handleLogout} />
      <main className="flex overflow-hidden">
        <Sidebar />
        {!selectedPlaylist && (
          <PlaylistsContainer
            playlists={filteredPlaylists}
            searchQuery={searchQuery}
            onSearch={handleSearch}
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
            token={token}
          />
        )}
      </main>
    </div>
  );
}

export default Playlists;
