import { useState, useEffect } from "react";

function UserPlaylists({ playlists, onSelect }) {
  const [covers, setCovers] = useState({});

  useEffect(() => {
    const playlistCovers = playlists.reduce((acc, playlist) => {
      const cover = localStorage.getItem(`playlist-cover-${playlist._name}`);
      acc[playlist._id] = cover || "https://placehold.co/32";
      return acc;
    }, {});
    setCovers(playlistCovers);
  }, [playlists]);

  if (!playlists || playlists.length === 0) {
    return <p>Você ainda não tem playlists.</p>;
  }

  return (
    <div>
      {playlists.map((playlist) => (
        <div
          key={playlist._id}
          className="flex items-center mb-4"
          onClick={() => onSelect(playlist)}
        >
          <img
            src={covers[playlist._id]}
            alt="Capa da Playlist"
            className="w-32 h-32 rounded-lg mr-4"
          />
          <div className="flex flex-col">
            <h3 className="font-bold">{playlist._name}</h3>
            <p>{playlist._description}</p>
            <div className="flex flex-row mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPlaylists;

export const getPlaylistCover = (playlistName) =>
  localStorage.getItem(`playlist-cover-${playlistName}`) ||
  "https://placehold.co/32";
