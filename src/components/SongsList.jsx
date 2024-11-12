// src/components/SongsList.jsx
function SongsList({ songs, canEditfea }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex flex-col p-4 bg-gray-700 rounded-lg shadow-md"
        >
          <h3 className="text-lg text-white">{song.title}</h3>
          <p className="text-gray-400">{song.artist}</p>
          <p className="text-gray-500">{song.userId}</p>
          <div className="flex flex-row mt-4 border-t border-gray-600">
            <button
              onClick={() => playSong(song.url)}
              className="flex items-center p-4 m-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Play
            </button>
            {canEdit && (
              <>
                <button
                  onClick={() => deleteSong(song.id)}
                  className="flex items-center p-4 m-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => editSong(song.id)}
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
