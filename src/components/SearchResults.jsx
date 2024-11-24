// src/components/SearchResults.jsx
import SongsList from "./Song/SongsList";

function SearchResults({ searchQuery, songs, onClearSearch }) {
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredSongs.length === 0) {
    return (
      <div className="text-white text-center">
        <p>Nenhuma música encontrada.</p>
        <button
          onClick={onClearSearch}
          className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Limpar busca
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onClearSearch}
        className="mb-2 py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        Limpar busca
      </button>
      <SongsList songs={filteredSongs} />
    </div>
  );
}

export default SearchResults;
