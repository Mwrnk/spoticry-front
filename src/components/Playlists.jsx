function TrendingPlaylists({ playlists }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Tendências</h2>
      <div className="flex overflow-x-scroll space-x-4">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              key={playlist.id || playlist._id}
              className="min-w-[200px] bg-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-xl font-bold">
                {playlist.name || playlist._name}
              </h3>
              <p className="text-sm">
                {playlist.description || playlist._description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma playlist encontrada</p>
        )}
      </div>
    </div>
  );
}

export default TrendingPlaylists;
