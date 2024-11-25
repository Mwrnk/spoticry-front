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

import add from "../assets/add.svg";
function Songs() {
  const { userId, token } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

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

  useEffect(() => {
    fetchUserSongs();
  }, [userId]);

  const fetchUserSongs = async () => {
    const data = await fetchSongs();
    const userSongs = data.filter((song) => song.userId === userId);
    setSongs(userSongs);
  };

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="flex overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-4">
          <SearchBar
            searchQuery={searchQuery}
            placeholder="Pesquisar em suas músicas..."
            onSearch={handleSearch}
          />
          <div className="flex items-center justify-between my-4 py-2 space-x-8">
            <h1 className="text-2xl font-bold">Suas músicas</h1>
            <div className="flex items-center space-x-4">
              <button
                className="py-2 px-2 bg-blue-500 text-white rounded-lg"
                onClick={() => setIsModalOpen(true)}
              >
                <img src={add} alt="add" />
              </button>
            </div>
          </div>

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
