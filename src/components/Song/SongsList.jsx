import { useState } from "react";
import SoundPlayer from "../SoundPlayer";

function SongsList({
  songs = [],
  canEdit = false,
  onEdit = () => {},
  onDelete = () => {},
  isInPlaylistDetails = false,
  onAddToPlaylist = () => {},
  isPlaylistTrack = false,
}) {
  const [sortOrder, setSortOrder] = useState("asc");
  const [playingUrl, setPlayingUrl] = useState(null);

  const handlePlayPause = (url) => {
    if (playingUrl === url) {
      setPlayingUrl(null);
    } else {
      setPlayingUrl(url);
    }
  };

  const sortedSongs = [...songs].sort((a, b) => {
    const songA = a.song || a;
    const songB = b.song || b;
    if (sortOrder === "asc") {
      return songA.title.localeCompare(songB.title);
    } else {
      return songB.title.localeCompare(songA.title);
    }
  });

  if (!Array.isArray(songs)) {
    console.error("songs is not an array:", songs);
    return null;
  }
  console.log("SongsList songs:", songs);

  return (
    <div>
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="mb-4 p-2 bg-gray-500 text-white rounded"
      >
        Ordenar {sortOrder === "asc" ? "Descendente" : "Ascendente"}
      </button>
      <div className="grid grid-cols-1 gap-4">
        {sortedSongs.map((item, index) => {
          const song = item.song || item;
          return (
            <div
              key={`${song.id}-${index}`}
              className="flex flex-col p-4 bg-gray-700 rounded-lg shadow-md"
            >
              <h3 className="text-lg text-white">{song.title}</h3>
              <p className="text-gray-400">{song.artist}</p>
              <div className="flex flex-row mt-4 border-t border-gray-600">
                <button
                  onClick={() => handlePlayPause(song.url)}
                  className="flex items-center p-4 m-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  {playingUrl === song.url ? "Pause" : "Play"}
                </button>
                {isInPlaylistDetails && (
                  <button
                    onClick={() => onAddToPlaylist(song)}
                    className="flex items-center p-4 m-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
                  >
                    Adicionar
                  </button>
                )}
                {canEdit && (
                  <>
                    <button
                      onClick={() => onDelete(song.id)}
                      className="flex items-center p-4 m-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onEdit(song)}
                      className="flex items-center p-4 m-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      Edit
                    </button>
                  </>
                )}
                {isPlaylistTrack && (
                  <button
                    onClick={() => onDelete(song.id)}
                    className="flex items-center p-4 m-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Remover
                  </button>
                )}
              </div>
              <SoundPlayer url={song.url} playing={playingUrl === song.url} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongsList;
