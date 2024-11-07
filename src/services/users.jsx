import axios from "axios";
import { getTokenData } from "../services/getTokenData"; // Ensure correct import path

const BASE_URL =
  "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default";

export const login = async (body, navigate) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, body);
    const token = response.data.token;
    localStorage.setItem("token", token);
    const tokenData = getTokenData(token);
    if (tokenData) {
      navigate("/home");
    } else {
      throw new Error("Dado de token invalido");
    }
  } catch (error) {
    console.error(error);
    if (error.response) {
      alert(error.response.data.error);
    } else {
      alert("Ocorreu um erro ao realizar o login. Por favor, tente novamente.");
    }
  }
};
export const logout = () => {
  localStorage.removeItem("token");
};
