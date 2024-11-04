/* eslint-disable react/prop-types */
// src/components/SongsList.jsx

function SongsList({ songs }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Músicas</h2>
      <div className="flex overflow-x-scroll space-x-4">
        {songs.length > 0 ? (
          songs.map((song) => (
            <div
              key={song.id || song._id}
              className="min-w-[200px] bg-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-xl font-bold">{song.title || song._title}</h3>
              <p className="text-sm">{song.artist || song._artist}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma música encontrada</p>
        )}
      </div>
    </div>
  );
}

export default SongsList;
