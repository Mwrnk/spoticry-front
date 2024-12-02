// src/components/SearchResults.jsx
import SongsList from "../Song/Pages/SongsList";

function SearchResults({ searchQuery, songs, onClearSearch }) {
  // Filtra as músicas com base na consulta de pesquisa
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Se nenhuma música for encontrada, exibe uma mensagem e um botão para limpar a busca
  if (filteredSongs.length === 0) {
    return (
      <div className="text-white text-center">
        <p className="font-bold">Nenhuma música encontrada!</p>
        <button
          onClick={onClearSearch}
          className="mt-4 py-2 px-4 bg-gradient-to-bl from-custom-blue to-custom-purple text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 active:scale-95"
        >
          Limpar busca
        </button>
      </div>
    );
  }

  // Se músicas forem encontradas, exibe a lista de músicas filtradas e um botão para limpar a busca
  return (
    <div>
      <button
        onClick={onClearSearch}
        className="mb-8 py-2 px-4 bg-gradient-to-bl from-custom-blue to-custom-purple text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 active:scale-95"
      >
        Limpar busca
      </button>
      <SongsList songs={filteredSongs} />
    </div>
  );
}

export default SearchResults;
