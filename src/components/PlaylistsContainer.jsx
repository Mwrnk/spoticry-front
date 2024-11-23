import UserPlaylists from "./UsersPlaylist";
import PlaylistModal from "./PlaylistModal";
import add from "../assets/add.svg";
import SearchBar from "./SearchBar";

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
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex items-center justify-start my-4 py-2 space-x-8">
        <h1 className="text-2xl font-bold">Suas Playlists</h1>
        <button
          className="py-2 px-2 bg-blue-500 text-white rounded-lg"
          onClick={openModal}
        >
          <img src={add} alt="add" />
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <SearchBar
          placeholder="Buscar playlists..."
          value={searchQuery}
          onSearch={onSearch}
        />
      </div>
      <UserPlaylists
        playlists={playlists}
        covers={covers}
        onSelect={onSelect}
      />
      <PlaylistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreatePlaylist={handleCreatePlaylist}
        isEditing={false}
      />
    </div>
  );
};

export default PlaylistsContainer;
