import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { savePlaylist } from "../services/playlistService";

const PlaylistModal = ({
  isOpen,
  onClose,
  onSave = () => {},
  playlist = {},
  isEditing = false,
}) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const { userId, token } = useContext(UserContext);

  useEffect(() => {
    if (isEditing && playlist) {
      setPlaylistName(playlist.name || "");
      setPlaylistDescription(playlist.description || "");
    }
  }, [isEditing, playlist]);

  const handleSave = async () => {
    try {
      if (!token) throw new Error("Token de autenticação não encontrado.");

      const updatedPlaylist = {
        userId,
        name: playlistName,
        description: playlistDescription,
        _id: playlist._id,
      };

      const response = await savePlaylist(updatedPlaylist, token, isEditing);

      if (response.success) {
        onSave({
          name: playlistName,
          description: playlistDescription,
        });
        onClose();
      }
    } catch (error) {
      console.error("Erro ao criar/atualizar playlist:", error);
      alert("Não foi possível criar/atualizar a playlist. Tente novamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-gray-600 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Editar Playlist" : "Adicionar Playlist"}
        </h2>
        <input
          type="text"
          placeholder="Nome da Playlist"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Descrição da Playlist"
          value={playlistDescription}
          onChange={(e) => setPlaylistDescription(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <div className="flex justify-start space-x-4">
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleSave}
          >
            {isEditing ? "Salvar Alterações" : "Adicionar"}
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
