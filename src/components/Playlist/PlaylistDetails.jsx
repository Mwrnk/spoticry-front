import { useState, useEffect, useContext, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/userContext";
import { fetchSongs, getSong } from "../../services/songService";
import {
  fetchPlaylistTracks,
  addSongToPlaylist,
  deletePlaylist,
  removeSongFromPlaylist,
  fetchUserPlaylists,
} from "../../services/playlistService";
import SongsList from "../Song/SongsList";
import PlaylistModal from "./PlaylistModal";
import SearchBar from "../SearchBar";
import LoadingSpinner from "../LoadingSpinner";
import edit from "../../assets/edit.svg";
import remove from "../../assets/remove.svg";
import back from "../../assets/back.svg";

const PlaylistDetails = ({ selectedPlaylist, onClose }) => {
  const [songs, setSongs] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId, token } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSongsList = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchSongs();
      setSongs(data);
    } catch (error) {
      toast.error("Erro ao buscar músicas");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPlaylistSongs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPlaylistTracks(selectedPlaylist._id, token);
      const songDetailsPromises = data.songs.map((songId) =>
        getSong(songId, token)
      );
      const songDetails = await Promise.all(songDetailsPromises);
      setTracks(songDetails);
    } catch (error) {
      toast.error("Erro ao buscar músicas da playlist");
    } finally {
      setLoading(false);
    }
  }, [selectedPlaylist._id, token]);

  useEffect(() => {
    if (userId && selectedPlaylist._id) {
      fetchSongsList();
      fetchPlaylistSongs();
    }
  }, [userId, selectedPlaylist._id, fetchSongsList, fetchPlaylistSongs]);

  const updatePlaylists = async () => {
    await fetchUserPlaylists(userId, token);
  };

  const handleAddToPlaylist = async (song) => {
    toast.promise(
      addSongToPlaylist(selectedPlaylist._id, song.id, token).then(() => {
        setTracks((prevTracks) => [...prevTracks, song]);
        updatePlaylists();
      }),
      {
        pending: "Adicionando música à playlist...",
        success: "Música adicionada com sucesso!",
        error: "Erro ao adicionar música à playlist",
      }
    );
  };

  const handleDelete = async () => {
    toast.promise(
      deletePlaylist(selectedPlaylist._id, token).then((response) => {
        if (response.success) {
          toast.success("Playlist deletada com sucesso!");
          updatePlaylists();
          onClose(null);
        }
      }),
      {
        pending: "Deletando playlist...",
        success: "Playlist deletada com sucesso!",
        error: "Erro ao deletar a playlist. Tente novamente.",
      }
    );
  };

  const handleRemoveFromPlaylist = async (songId) => {
    toast.promise(
      removeSongFromPlaylist(selectedPlaylist._id, songId, token).then(() => {
        fetchPlaylistSongs();
        updatePlaylists();
      }),
      {
        pending: "Removendo música da playlist...",
        success: "Música removida com sucesso!",
        error: "Erro ao remover música da playlist",
      }
    );
  };

  const handleSave = async (updatedPlaylist) => {
    toast.promise(
      fetchPlaylistSongs().then(() => {
        selectedPlaylist._name = updatedPlaylist.name;
        selectedPlaylist._description = updatedPlaylist.description;
        setIsOpen(false);
        updatePlaylists();
      }),
      {
        pending: "Salvando alterações na playlist...",
        success: "Playlist editada com sucesso!",
        error: "Erro ao editar a playlist",
      }
    );
  };

  const filteredSongs = songs.filter((song) =>
    song?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mb-4">
        <button
          onClick={() => onClose(null)}
          className="text-white px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-zinc-600 flex items-center"
        >
          <img src={back} alt="Voltar" className="h-8 w-8" />
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-4 p-4 bg-gradient-to-t from-zinc-800 to-zinc-700 rounded-lg shadow-md">
        <img
          src={"https://placehold.co/64x64"}
          alt="Playlist Cover"
          className="w-64 h-64 rounded-lg shadow-2xl"
        />
        <div className="flex-grow space-y-2">
          <p className="text-lg font-semibold text-white">
            {selectedPlaylist._description}
          </p>
          <h2 className="text-8xl font-bold">{selectedPlaylist._name}</h2>
        </div>
        <div className="flex flex-col items-center space-y-4 m-4">
          <button
            onClick={() => setIsOpen(true)}
            className="py-2 px-3 text-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-zinc-600 flex items-center"
          >
            <img src={edit} alt="Edit" className="h-6 w-6" />
          </button>
          <button
            onClick={handleDelete}
            className="py-2 px-3 text-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-zinc-600 flex items-center"
          >
            <img src={remove} alt="Remove" className="h-6 w-6" />
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">
        Vamos incrementar sua playlist
      </h2>
      <SearchBar
        placeholder="Buscar músicas..."
        value={searchQuery}
        onSearch={setSearchQuery}
      />
      <div className="grid grid-cols-2 gap-4 my-6">
        <div>
          <h2 className="text-white font-bold text-lg">Músicas</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <SongsList
              songs={filteredSongs}
              isInPlaylistDetails={true}
              onAddToPlaylist={handleAddToPlaylist}
              onDelete={handleRemoveFromPlaylist}
            />
          )}
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Faixas da Playlist</h3>
          {loading ? (
            <LoadingSpinner />
          ) : tracks.length > 0 ? (
            <SongsList
              songs={tracks}
              isInPlaylistDetails={false}
              onDelete={handleRemoveFromPlaylist}
              isPlaylistTrack={true}
            />
          ) : (
            <p className="text-gray-300 text-lg font-thin ">
              Nenhuma música na playlist
            </p>
          )}
        </div>
      </div>
      <PlaylistModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isEditing={true}
        playlist={selectedPlaylist}
        onSave={handleSave}
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
    </div>
  );
};

export default PlaylistDetails;
