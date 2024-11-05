import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.svg";
import user from "../assets/user.svg";
import add from "../assets/add.svg";
import AddMusicModal from "./AddMusicModal";

const BASE_URL =
  "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default";

function Header({ onLogout, onSearch, onAddSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  const handleAddMusic = async (newSong) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token de autenticação não encontrado.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/song`, newSong, {
        headers: {
          Authorization: token,
        },
      });

      console.log("Música adicionada com sucesso:", response.data);
      onAddSuccess(); // Chama a função para atualizar as músicas
    } catch (error) {
      if (error.response) {
        console.error("Erro ao adicionar música:", error.response.data);
      } else {
        console.error("Erro na requisição:", error.message);
      }
    }
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8" />
      </div>
      <div className="flex-1 mx-4 hidden md:flex justify-center">
        <input
          type="text"
          placeholder="O que você quer ouvir hoje?"
          className="w-1/4 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white mr-4"
          title="Adicionar Músicas"
        >
          <img src={add} alt="Add Music" className="h-8" />
        </button>
        <button
          onClick={onLogout}
          className="py-2 px-4 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
        <button className="text-white ml-4">
          <img src={user} alt="User" className="h-8" />
        </button>
      </div>

      <AddMusicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMusic}
      />
    </header>
  );
}

export default Header;
