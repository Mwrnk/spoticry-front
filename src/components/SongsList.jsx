function SongsList({
  songs = [],
  canEdit = false,
  onEdit = () => {},
  onDelete = () => {},
  isInPlaylistDetails = false,
  onAddToPlaylist = () => {},
}) {
  if (!Array.isArray(songs)) {
    console.error("songs is not an array:", songs);
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {songs.map((song, index) => (
        <div
          key={`${song.id}-${index}`}
          className="flex flex-col p-4 bg-gray-700 rounded-lg shadow-md"
        >
          <h3 className="text-lg text-white">{song.title}</h3>
          <p className="text-gray-400">{song.artist}</p>
          <p className="text-gray-500">{song.userId}</p>
          <p className="text-gray-300">{song.id}</p>
          <div className="flex flex-row mt-4 border-t border-gray-600">
            <button className="flex items-center p-4 m-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Play
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default SongsList;
