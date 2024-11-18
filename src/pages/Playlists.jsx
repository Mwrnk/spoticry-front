import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PlaylistsContainer from "../components/PlaylistsContainer";
import PlaylistDetails from "../components/PlaylistDetails";

import { BASE_URL } from "../services/api";
import { getTokenData } from "../services/getTokenData";

function Playlists() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = getTokenData(token)?.id;

  const [playlists, setPlaylists] = useState([]);
  const [playlistCovers, setPlaylistCovers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

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
      console.error("Erro ao buscar playlists do usu rio:", error);
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
            covers={playlistCovers}
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
