import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { savePlaylist } from "../../../services/playlistService";

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
    <div className="fixed inset-0 bg-zinc-900 bg-opacity-75 flex items-center justify-center drop-shadow-2xl">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditing ? "Editar Playlist" : "Criar Playlist"}
        </h2>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Nome da Playlist
        </label>
        <input
          type="text"
          placeholder="Nome da Playlist"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg bg-zinc-700 text-white"
        />
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Descrição da Playlist
        </label>
        <textarea
          placeholder="Descrição da Playlist"
          value={playlistDescription}
          onChange={(e) => setPlaylistDescription(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg bg-zinc-700 text-white"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-zinc-700 rounded mr-2 hover:bg-gray-400 transition-transform transform hover:scale-105"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-custom-blue to-custom-purple text-white font-semibold rounded transition-transform transform hover:scale-105"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
