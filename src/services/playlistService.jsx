// FILE: services/playlistService.js
import axios from "axios";
import { BASE_URL } from "../api/url";

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
          Authorization: ` ${token}`,
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
          Authorization: ` ${token}`,
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

export const deletePlaylist = async (playlistId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/playlist/${playlistId}`, {
      headers: {
        Authorization: ` ${token}`,
      },
    });

    if (response.data.message === "Playlist deleted successfully") {
      return { success: true, data: response.data };
    } else {
      throw new Error("Falha ao deletar a playlist. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao deletar a playlist:", error);
    throw error;
  }
};

export const fetchPlaylistTracks = async (playlistId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/playlist/${playlistId}/song`,
      {
        headers: {
          Authorization: ` ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar músicas da playlist:", error);
    throw error;
  }
};

export const removeSongFromPlaylist = async (playlistId, songId, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/playlist/${playlistId}/song/${songId}`,
      {
        headers: {
          Authorization: ` ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao remover música da playlist", error);
    throw error;
  }
};
export const fetchPlaylists = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/playlist`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data.playlists;
  } catch (error) {
    console.error("Erro ao buscar playlists", error);
    throw error;
  }
};
