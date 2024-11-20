// FILE: services/playlistService.js
import axios from "axios";
import { BASE_URL } from "./api";

export const savePlaylist = async (playlist, token, isEditing) => {
  const { userId, name, description, _id } = playlist;

  const updatedPlaylist = {
    userId,
    name,
    description,
    songs: [],
  };

  let response;
  if (isEditing) {
    response = await axios.patch(
      `${BASE_URL}/playlist/${_id}`,
      updatedPlaylist,
      {
        headers: {
          Authorization: ` ${token}`,
        },
      }
    );
  } else {
    response = await axios.post(`${BASE_URL}/playlist`, updatedPlaylist, {
      headers: {
        Authorization: ` ${token}`,
      },
    });
  }

  if (
    response.data.message === "Playlist created successfully" ||
    response.data.message === "Playlist updated successfully"
  ) {
    return { success: true, data: response.data };
  } else {
    throw new Error("Falha ao criar/atualizar playlist. Tente novamente.");
  }
};

export const addSongToPlaylist = async (playlistId, songId, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/playlist/${playlistId}/song`,
      { songId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar música à playlist", error);
    throw error;
  }
};

export const fetchUserPlaylists = async (userId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/playlist/user/${userId}/playlists`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const playlistsData = response.data.playlists;

    return { playlists: playlistsData };
  } catch (error) {
    console.error("Erro ao buscar playlists do usuário:", error);
    throw error;
  }
};
