import UserPlaylists from "../components/UsersPlaylist";
import AddPlaylistModal from "../components/AddPlaylistModal";
import add from "../assets/add.svg";
const PlaylistsContainer = ({
  playlists,
  covers,
  isModalOpen,
  closeModal,
  handleCreatePlaylist,
  openModal,
  onSelect,
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
      <UserPlaylists
        playlists={playlists}
        covers={covers}
        onSelect={onSelect}
      />
      <AddPlaylistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreatePlaylist={handleCreatePlaylist}
      />
    </div>
  );
};

export default PlaylistsContainer;
