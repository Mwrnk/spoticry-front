import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../context/userContext";
import {
  fetchSongs,
  addSong,
  editSong,
  deleteSong,
} from "../services/songService";

import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import SongsList from "../components/Song/SongsList";
import MusicModal from "../components/Song/SongModal";
import LoadingSpinner from "../components/LoadingSpinner";

import add from "../assets/addmusic.svg";
import seta from "../assets/seta.svg";

function Songs() {
  const { userId, token } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearch = (query) => setSearchQuery(query);
  const clearSearch = () => setSearchQuery("");

  const handleAddMusic = async (newSong) => {
    try {
      await addSong({ ...newSong, userId }, token);
      await fetchUserSongs();
      toast.success("Música adicionada com sucesso!");
    } catch (error) {
      toast.error("Erro ao adicionar música");
    }
  };

  const handleEditMusic = async (songId, updatedSong) => {
    try {
      const response = await editSong(songId, updatedSong, token);
      if (response.status === 200) {
        const updatedSongs = songs.map((song) =>
          song.id === songId ? { ...song, ...updatedSong } : song
        );
        setSongs(updatedSongs);
        toast.success("Música editada com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao editar música");
    }
  };

  const handleDeleteMusic = async (songId) => {
    try {
      await deleteSong(songId, token);
      await fetchUserSongs();
      toast.success("Música deletada com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar música");
    }
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    fetchUserSongs();
  }, [userId]);

  const fetchUserSongs = async () => {
    setLoading(true);
    try {
      const data = await fetchSongs();
      const userSongs = data.filter((song) => song.userId === userId);
      setSongs(userSongs);
    } catch (error) {
      toast.error("Erro ao carregar músicas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="flex overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="flex items-center justify-between space-x-8">
                <div className="flex items-center space-x-4">
                  <SearchBar
                    searchQuery={searchQuery}
                    placeholder="Busque suas músicas..."
                    onSearch={handleSearch}
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
                  <button
                    className="py-2 px-2 bg-gradient-to-br from-custom-blue to-custom-purple text-white rounded-lg transform transition-transform duration-300 hover:scale-105 active:scale-95"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <img src={add} alt="add" className="h-8 w-8" />
                  </button>
                </div>
              </div>

              <h1 className="text-4xl m-4 pb-6 text-white font-bold">
                Suas Músicas
              </h1>
              {isModalOpen && (
                <MusicModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSave={handleAddMusic}
                />
              )}
              {searchQuery ? (
                <SearchResults
                  searchQuery={searchQuery}
                  songs={songs}
                  onClearSearch={clearSearch}
                />
              ) : (
                <>
                  <SongsList
                    songs={songs}
                    canEdit={true}
                    onEdit={(song) => setSelectedSong(song)}
                    onDelete={handleDeleteMusic}
                    isInPlaylistDetails={false}
                    sortOrder={sortOrder}
                    hideSortButton
                  />
                  {selectedSong && (
                    <MusicModal
                      isOpen={!!selectedSong}
                      onClose={() => setSelectedSong(null)}
                      onSave={(updatedSong) =>
                        handleEditMusic(selectedSong.id, updatedSong)
                      }
                      music={selectedSong}
                    />
                  )}
                </>
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
      />
    </div>
  );
}

export default Songs;
