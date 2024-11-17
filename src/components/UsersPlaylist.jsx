import { useState, useEffect } from "react";

function UserPlaylists({ playlists, onDelete }) {
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
        <div key={playlist._id} className="flex items-center mb-4">
          <img
            src={covers[playlist._id]}
            alt="Capa da Playlist"
            className="w-32 h-32 rounded-lg mr-4"
          />
          <div className="flex flex-col">
            <h3 className="font-bold">{playlist._name}</h3>
            <p>{playlist._description}</p>
            <div className="flex flex-row mt-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => onDelete(playlist._id)}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPlaylists;
