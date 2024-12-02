import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import PlaylistsContainer from "../components/Playlist/Pages/PlaylistsContainer";
import PlaylistDetails from "../components/Playlist/Pages/PlaylistDetails";
import LoadingSpinner from "../components/Common/LoadingSpinner";

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
  const [loading, setLoading] = useState(false);

  // Função para buscar as playlists do usuário
  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const { playlists } = await fetchUserPlaylists(userId, token);
      setPlaylists(playlists);
    } catch (error) {
      toast.error("Erro ao buscar playlists do usuário");
      console.error("Erro ao buscar playlists do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para selecionar uma playlist
  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  // Função para fechar a visualização de uma playlist
  const handleClosePlaylist = () => {
    setSelectedPlaylist(null);
    fetchPlaylists();
  };

  // Efeito para buscar playlists quando userId ou token mudarem
  useEffect(() => {
    if (userId && token) {
      fetchPlaylists();
    }
  }, [userId, token]);

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Funções para abrir e fechar o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para criar uma nova playlist
  const handleCreatePlaylist = async () => {
    try {
      await fetchPlaylists();
      setIsModalOpen(false);
      toast.success("Playlist criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar playlist");
    }
  };

  // Função para salvar uma playlist
  const handleSavePlaylist = async () => {
    try {
      await fetchPlaylists();
      setIsModalOpen(false);
      toast.success("Playlist salva com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar playlist");
    }
  };

  // Filtra as playlists com base na query de busca
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist._name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Função para lidar com a busca
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Função para alternar a ordenação das playlists
  const handleSortToggle = () => {
    setIsSortEnabled(!isSortEnabled);
  };

  // Ordena as playlists se a ordenação estiver habilitada
  const sortedPlaylists = isSortEnabled
    ? [...filteredPlaylists].sort((a, b) => a._name.localeCompare(b._name))
    : filteredPlaylists;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header onLogout={handleLogout} />
      <main className="flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {!selectedPlaylist && (
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
                  aria-label="Contêiner de playlists"
                />
              )}
              {selectedPlaylist && (
                <PlaylistDetails
                  selectedPlaylist={selectedPlaylist}
                  onClose={handleClosePlaylist}
                  token={token}
                  aria-label="Detalhes da playlist"
                />
              )}
            </>
          )}
        </div>
      </main>
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
        aria-live="polite"
      />
    </div>
  );
}

export default Playlists;
