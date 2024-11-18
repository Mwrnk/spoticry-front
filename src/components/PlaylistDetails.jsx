import { useState, useEffect } from "react";
import { fetchSongs, fetchPlaylistTracks } from "../services/api";
import { getPlaylistCover } from "./UsersPlaylist";
import SongsList from "./SongsList";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../services/api";
const PlaylistDetails = ({ selectedPlaylist, onClose }) => {
  const [songs, setSongs] = useState([]);
  const [tracks, setTracks] = useState([]);
  const { userId, token } = useContext(UserContext);

  useEffect(() => {
    fetchSongsList();
    fetchPlaylistSongs();
  }, [userId, selectedPlaylist._id]);

  const fetchSongsList = async () => {
    const data = await fetchSongs();
    console.log("songs:", data);
    setSongs(data);
  };

  const fetchPlaylistSongs = async () => {
    const data = await fetchPlaylistTracks(selectedPlaylist._id);
    console.log("tracks:", data);

    setTracks(data.songs || []);
  };

  const handleAddToPlaylist = async (song) => {
    try {
      await axios.post(
        `${BASE_URL}/playlist/${selectedPlaylist._id}/song`,
        { songId: song.id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      await fetchPlaylistSongs();
    } catch (error) {
      console.error("Error adding song to playlist", error);
    }
  };

  const handleRemoveFromPlaylist = async (songId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${BASE_URL}/playlist/${selectedPlaylist._id}/song/${songId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      await fetchPlaylistSongs();
    } catch (error) {
      console.error("Error removing song from playlist", error);
    }
  };

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
          src={getPlaylistCover(selectedPlaylist._name)}
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
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Delete
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2>Songs</h2>
          <SongsList
            songs={songs}
            isInPlaylistDetails={true}
            onAddToPlaylist={handleAddToPlaylist}
            onDelete={handleRemoveFromPlaylist}
          />
        </div>
        <div>
          <h3>Tracks from the Playlist</h3>
          <SongsList songs={tracks} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetails;
