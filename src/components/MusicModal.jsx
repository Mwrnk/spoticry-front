import { useState } from "react";

function MusicModal({ isOpen, onClose, onSave, music = {} }) {
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-gray-600 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Editar Música" : "Adicionar Música"}
        </h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Artista"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isEditing ? "Salvar Alterações" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MusicModal;