function SongsList({ songs }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {songs.map((song) => (
        <div key={song.id} className="p-4 bg-gray-700 rounded-lg shadow-md">
          <h3 className="text-lg text-white">{song.title}</h3>
          <p className="text-gray-400">{song.artist}</p>
          <p className="text-gray-500">{song.userId}</p>
        </div>
      ))}
    </div>
  );
}

export default SongsList;
