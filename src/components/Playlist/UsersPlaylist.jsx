import { useEffect } from "react";

function UserPlaylists({ playlists, onSelect }) {
  useEffect(() => {}, [playlists]);

  if (!playlists || playlists.length === 0) {
    return <p>Não foram encontradas nenhuma playlist.</p>;
  }

  return (
    <div>
      {playlists.map((playlist) => (
        <div
          key={playlist._id}
          className="flex items-center mb-4 w-1/2 p-4 bg-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-700 transition-colors duration-300"
          onClick={() => onSelect(playlist)}
        >
          <img
            src="https://placehold.co/32"
            alt="Capa da Playlist"
            className="w-32 h-32 rounded-lg mr-4"
          />
          <div className="flex flex-col">
            <h3 className="text-4xl font-bold">{playlist._name}</h3>
            <p className="text-lg font-light text-gray-300">
              {playlist._description}
            </p>
            <div className="flex flex-row mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPlaylists;
