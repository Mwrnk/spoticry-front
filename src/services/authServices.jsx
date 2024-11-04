import axios from "axios";

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
      return { success: true, token: response.data.token };
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
};
