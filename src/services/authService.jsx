import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const BASE_URL =
  "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);

      let userId = localStorage.getItem("userId");
      if (!userId) {
        userId = uuidv4();
        localStorage.setItem("userId", userId);
      }

      return { success: true, token: response.data.token, userId };
    } else {
      return { success: false, error: "Token não recebido na resposta da API" };
    }
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return {
      success: false,
      error: "Falha na autenticação. Verifique suas credenciais.",
    };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};
