import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../context/userContext";
import { fetchSongs, getSong } from "../services/songService";
import {
  fetchPlaylistTracks,
  addSongToPlaylist,
  deletePlaylist,
  removeSongFromPlaylist,
  fetchUserPlaylists,
} from "../services/playlistService";
import SongsList from "./SongsList";
import PlaylistModal from "./PlaylistModal";
import SearchBar from "./SearchBar";

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
      console.error("Erro ao buscar músicas", error);
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
      console.error("Erro ao buscar músicas da playlist", error);
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

  const handleAddToPlaylist = async (song) => {
    try {
      await addSongToPlaylist(selectedPlaylist._id, song.id, token);
      await fetchPlaylistSongs();
    } catch (error) {
      console.error("Erro ao adicionar música à playlist", error);
    }
  };

  const handleDelete = async () => {
    try {
      const playlistId = selectedPlaylist._id;
      const response = await deletePlaylist(playlistId, token);
      if (response.success) {
        alert("Playlist deletada com sucesso!");
        onClose(null);
      }
    } catch (error) {
      alert("Erro ao deletar a playlist. Tente novamente.");
    }
  };

  const handleRemoveFromPlaylist = async (songId) => {
    try {
      await removeSongFromPlaylist(selectedPlaylist._id, songId, token);
      await fetchPlaylistSongs();
    } catch (error) {
      console.error("Erro ao remover música da playlist", error);
    }
  };

  const handleSave = async (updatedPlaylist) => {
    await fetchPlaylistSongs();
    selectedPlaylist._name = updatedPlaylist.name;
    selectedPlaylist._description = updatedPlaylist.description;
    setIsOpen(false);
  };

  const filteredSongs = songs.filter((song) =>
    song?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTracks = tracks.filter((track) =>
    track?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mb-4">
        <button
          onClick={() => onClose(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={"https://placehold.co/32x32"}
          alt="Playlist Cover"
          className="w-32 h-32 rounded-lg"
        />
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            {selectedPlaylist._description}
          </p>
          <h2 className="text-3xl font-bold">{selectedPlaylist._name}</h2>
        </div>
        <div className="flex flex-col items-center space-y-2 m-4">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
      <SearchBar
        placeholder="Buscar músicas..."
        value={searchQuery}
        onSearch={setSearchQuery}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2>Songs</h2>
          {loading ? (
            <p>Carregando...</p>
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
          <h3>Tracks from the Playlist</h3>
          {loading ? (
            <p>Carregando...</p>
          ) : filteredTracks.length > 0 ? (
            <SongsList
              songs={filteredTracks}
              isInPlaylistDetails={false}
              onDelete={handleRemoveFromPlaylist}
              isPlaylistTrack={true}
            />
          ) : (
            <p>Nenhuma música na playlist</p>
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
    </div>
  );
};

export default PlaylistDetails;
