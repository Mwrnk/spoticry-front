import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { savePlaylist } from "../../services/playlistService";

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

  const handleSave = async () => {
    try {
      if (!token) throw new Error("Token de autenticação não encontrado.");

      const updatedPlaylist = {
        userId,
        name: playlistName,
        description: playlistDescription,
        _id: isEditing ? playlist._id : undefined,
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
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-gray-600 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Editar Playlist" : "Criar Playlist"}
        </h2>
        <input
          type="text"
          placeholder="Nome da Playlist"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="w-full p-2 mb-4"
        />
        <textarea
          placeholder="Descrição da Playlist"
          value={playlistDescription}
          onChange={(e) => setPlaylistDescription(e.target.value)}
          className="w-full p-2 mb-4"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Salvar
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PlaylistModal;
