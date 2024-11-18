import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { UserContext } from "../context/userContext";
import { fetchSongs, BASE_URL } from "../services/api";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import SongsList from "../components/SongsList";
import MusicModal from "../components/MusicModal";

import add from "../assets/add.svg";
function Musics() {
  const { userId, token } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleSearch = (query) => setSearchQuery(query);
  const clearSearch = () => setSearchQuery("");

  const handleAddMusic = (newSong) => {
    addSong({ ...newSong, userId });
    setSelectedSong(null);
  };

  const handleEditMusic = (songId, updatedSong) => {
    editSong(songId, updatedSong);
    setSelectedSong(null);
  };

  useEffect(() => {
    fetchUserSongs();
  }, [userId]); // Fetch user songs when the userId changes

  const fetchUserSongs = async () => {
    const data = await fetchSongs();
    const userSongs = data.filter((song) => song.userId === userId);
    setSongs(userSongs);
  };

  const addSong = async (newSongData) => {
    try {
      const response = await axios.post(`${BASE_URL}/song`, newSongData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        fetchUserSongs();
      }
    } catch (error) {
      console.error("Erro ao adicionar música", error);
    }
  };

  const editSong = async (songId, updatedSongData) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/song/${songId}`,
        updatedSongData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        const updatedSongs = songs.map((song) =>
          song.id === songId ? { ...song, ...updatedSongData } : song
        );
        setSongs(updatedSongs);
      }
    } catch (error) {
      console.error("Erro ao editar música", error);
    }
  };

  const deleteSong = async (songId) => {
    try {
      await axios.delete(`${BASE_URL}/song/${songId}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchUserSongs();
    } catch (error) {
      console.error("Erro ao deletar musica", error);
    }
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
          <div className="flex items-center justify-start my-4 py-2 space-x-8">
            <h1 className="text-2xl font-bold">Suas músicas</h1>
            <button
              className="py-2 px-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              <img src={add} alt="add" />
            </button>
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
                onDelete={deleteSong}
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
    </div>
  );
}

export default Musics;
