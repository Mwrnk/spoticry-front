export const getTokenData = (token) => {
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload;
  } catch (error) {
    if (error.message.includes("jwt expirado")) {
      console.error("Token expirou");
    } else if (error.message.includes("Token invalido")) {
      console.error("Token invalido");
    } else {
      console.error("Erro ao analisar token:", error);
    }
    return null;
  }
};
