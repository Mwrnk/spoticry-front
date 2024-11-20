// songService.js
import axios from "axios";
import { BASE_URL } from "./api";

export const fetchSongs = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/song`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data.songs;
  } catch (error) {
    console.error("Erro ao buscar musicas", error);
  }
};

export const getSong = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/song/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching song:", error);
    throw error;
  }
};

export const addSong = async (newSongData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/song`, newSongData, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.error("Erro ao adicionar música", error);
    throw error;
  }
};

export const editSong = async (songId, updatedSongData, token) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/song/${songId}`,
      updatedSongData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erro ao editar música", error);
    throw error;
  }
};

export const deleteSong = async (songId, token) => {
  try {
    await axios.delete(`${BASE_URL}/song/${songId}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.error("Erro ao deletar musica", error);
    throw error;
  }
};
