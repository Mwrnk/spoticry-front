import { useState } from "react";
import SoundPlayer from "../SoundPlayer";
import play from "../../assets/play_circle.svg";
import pause from "../../assets/pause_circle.svg";
import remove from "../../assets/remove.svg";
import edit from "../../assets/edit.svg";
import add from "../../assets/add.svg";
function SongsList({
  songs = [],
  canEdit = false,
  onEdit = () => {},
  onDelete = () => {},
  isInPlaylistDetails = false,
  onAddToPlaylist = () => {},
  isPlaylistTrack = false,
  sortOrder = "asc",
  hideSortButton = false,
}) {
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
      {!hideSortButton && (
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="mb-4 p-2 bg-gray-500 text-white rounded"
        >
          Ordenar {sortOrder === "asc" ? "Descendente" : "Ascendente"}
        </button>
      )}
      <div className="grid grid-cols-1 gap-4 w-full">
        {sortedSongs.map((item, index) => {
          const song = item.song || item;
          return (
            <div
              key={`${song.id}-${index}`}
              className="flex flex-col p-4 bg-zinc-800 rounded-lg shadow-md w-full"
            >
              <div className="flex items-center">
                <button
                  onClick={() => handlePlayPause(song.url)}
                  className="flex items-center m-4 text-white rounded-lg transform transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  <img
                    className="w-12 h-12"
                    src={playingUrl === song.url ? pause : play}
                    alt={playingUrl === song.url ? "Pause" : "Play"}
                  />
                </button>
                <img
                  src="https://placehold.co/128x128"
                  alt="Album cover"
                  className="mr-4 rounded-lg shadow-lg"
                />
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-white">
                    {song.title}
                  </h3>
                  <p className="text-gray-400">{song.artist}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  {canEdit && (
                    <>
                      <button
                        className="py-2 px-3 text-white rounded-lg transform transition-transform duration-300 hover:bg-yellow-600 hover:scale-105 flex items-center"
                        onClick={() => onEdit(song)}
                      >
                        <img src={edit} alt="Edit" className="h-6 w-6" />
                      </button>
                      <button
                        className="py-2 px-3 text-white rounded-lg transform transition-transform duration-300 hover:bg-red-600 hover:scale-105 flex items-center"
                        onClick={() => onDelete(song.id)}
                      >
                        <img src={remove} alt="Remove" className="h-6 w-6" />
                      </button>
                    </>
                  )}
                  {isInPlaylistDetails && (
                    <button
                      onClick={() => onAddToPlaylist(song)}
                      className="p-2"
                    >
                      <img src={add} alt="Add" />
                    </button>
                  )}
                </div>
              </div>
              {isPlaylistTrack && (
                <div className="flex flex-row mt-4 border-t border-gray-600">
                  <button
                    onClick={() => onDelete(song.id)}
                    className="flex items-center p-4 m-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Remover
                  </button>
                </div>
              )}
              <SoundPlayer url={song.url} playing={playingUrl === song.url} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongsList;
