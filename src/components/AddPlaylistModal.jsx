import { useContext, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/api";
import { UserContext } from "../context/userContext";

function AddPlaylistModal({ isOpen, onClose, onCreatePlaylist }) {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlistCover, setPlaylistCover] = useState(null);
  const { userId } = useContext(UserContext);

  const handleCreatePlaylist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token de autenticação não encontrado.");

      const newPlaylist = {
        userId,
        name: playlistName,
        description: playlistDescription,
        songs: [],
      };

      const response = await axios.post(`${BASE_URL}/playlist`, newPlaylist, {
        headers: {
          Authorization: ` ${token}`,
        },
      });

      if (response.data.message === "Playlist created successfully") {
        if (playlistCover) {
          const reader = new FileReader();

          reader.onloadend = () => {
            const base64Image = reader.result;
            if (base64Image) {
              localStorage.setItem(
                `playlist-cover-${playlistName}`, // Use o nome da playlist como chave
                base64Image
              );
            }
          };

          reader.onerror = (error) => {
            console.error("Erro ao carregar o arquivo de imagem:", error);
          };

          reader.readAsDataURL(playlistCover);
        }

        onCreatePlaylist({
          name: playlistName,
          description: playlistDescription,
        });
        onClose();
      } else {
        throw new Error("Falha ao criar playlist. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao criar playlist:", error);
      alert("Não foi possível criar a playlist. Tente novamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-gray-600 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Criar Playlist</h2>
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
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setPlaylistCover(file);
          }}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleCreatePlaylist}
        >
          Criar
        </button>
      </div>
    </div>
  );
}

export default AddPlaylistModal;
