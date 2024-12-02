import { useState } from "react";

function SongModal({ isOpen, onClose, onSave, music = {}, className = "" }) {
  const [title, setTitle] = useState(music.title || "");
  const [artist, setArtist] = useState(music.artist || "");
  const [url, setUrl] = useState(music.url || "");
  const isEditing = Boolean(music.id);

  const handleSave = () => {
    onSave({ id: music.id, title, artist, url });
    onClose();
  };

  if (!isOpen) return null; // Não renderiza o modal se não estiver aberto

  return (
    <div
      className={`fixed inset-0 bg-zinc-900 bg-opacity-75 flex items-center justify-center drop-shadow-2xl ${className}`}
    >
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditing ? "Editar Música" : "Adicionar Música"}
        </h2>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Título
        </label>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg bg-zinc-700 text-white"
        />
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Artista
        </label>
        <input
          type="text"
          placeholder="Artista"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg bg-zinc-700 text-white"
        />
        {!isEditing && (
          <>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              URL
            </label>
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 mb-4 rounded-lg bg-zinc-700 text-white"
            />
          </>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-zinc-700 rounded mr-2 hover:bg-gray-400 transition-transform transform hover:scale-105"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-custom-blue to-custom-purple  text-white font-semibold rounded transition-transform transform hover:scale-105"
          >
            {isEditing ? "Salvar Alterações" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SongModal;
