import axios from "axios";
export const BASE_URL =
  "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default";

export const fetchPlaylists = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/playlist`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.playlists;
  } catch (error) {
    console.error("Erro ao buscar playlists", error);
    return [];
  }
};

export const fetchSongs = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/song`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.songs;
  } catch (error) {
    console.error("Erro ao buscar musicas", error);
  }
};

export const fetchPlaylistTracks = async (playlistId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/playlist/${playlistId}/song`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar músicas da playlist", error);
    return [];
  }
};
