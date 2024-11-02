import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Se o token não existir, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
