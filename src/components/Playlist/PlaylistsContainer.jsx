import UserPlaylists from "./UsersPlaylist";
import PlaylistModal from "./PlaylistModal";
import add from "../../assets/add.svg";
import SearchBar from "../../components/SearchBar";
import seta from "../../assets/seta.svg";

const PlaylistsContainer = ({
  playlists,
  covers,
  isModalOpen,
  closeModal,
  handleCreatePlaylist,
  openModal,
  onSelect,
  searchQuery,
  onSearch,
  handleSavePlaylist,
  sortType,
  onSortChange,
  isSortEnabled,
  onSortToggle,
  sortOrder,
  handleSortOrderChange,
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center mb-4">
        <SearchBar
          placeholder="Buscar playlists..."
          value={searchQuery}
          onSearch={onSearch}
          aria-label="Barra de busca"
        />
        <button
          onClick={onSortToggle}
          className="ml-4 p-2 bg-zinc-800 text-white rounded-xl transform transition-transform duration-300 hover:scale-105 active:scale-95"
          aria-label={`Ordenar playlists em ordem ${
            isSortEnabled ? "decrescente" : "crescente"
          }`}
          title={`Ordenar playlists em ordem ${
            isSortEnabled ? "decrescente" : "crescente"
          }`}
        >
          <img
            src={seta}
            alt="Checkbox"
            className={`h-8 w-8 inline transform transition-transform duration-300 ${
              isSortEnabled ? "rotate-180" : ""
            }`}
          />
        </button>

        <button
          className="ml-4 p-2 bg-gradient-to-br from-custom-blue to-custom-purple text-white rounded-lg transform transition-all duration-300 hover:scale-105"
          onClick={openModal}
          aria-label="Adicionar nova playlist"
          title="Adicionar nova playlist"
        >
          <img
            src={add}
            alt="add"
            className="h-8 w-8 inline transform transition-transform duration-300"
          />
        </button>
      </div>
      <h1 className="text-4xl m-4 pb-6 text-white font-bold">Suas Playlists</h1>
      <UserPlaylists
        playlists={playlists}
        covers={covers}
        onSelect={onSelect}
        aria-label="Lista de playlists"
      />
      <PlaylistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreatePlaylist={handleCreatePlaylist}
        isEditing={false}
        onSave={handleSavePlaylist}
        aria-label="Modal de playlist"
      />
    </div>
  );
};

export default PlaylistsContainer;
