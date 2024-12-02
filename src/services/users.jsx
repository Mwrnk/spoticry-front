import axios from "axios";
import { getTokenData } from "./getTokenData";
import { toast } from "react-toastify";

const BASE_URL =
  "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default";

export const login = async (body, navigate) => {
  const toastId = toast.loading("Realizando login...");
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, body);
    const token = response.data.token;
    localStorage.setItem("token", token);
    const tokenData = getTokenData(token);
    if (tokenData) {
      toast.update(toastId, {
        render: "Login realizado com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      navigate("/home");
    } else {
      throw new Error("Dado de token inválido");
    }
  } catch (error) {
    console.error(error);
    if (error.response) {
      toast.update(toastId, {
        render: error.response.data.error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } else {
      toast.update(toastId, {
        render:
          "Ocorreu um erro ao realizar o login. Por favor, tente novamente.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
