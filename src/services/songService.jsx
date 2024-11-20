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
