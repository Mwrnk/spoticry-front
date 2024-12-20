import { Navigate } from "react-router-dom";
import { getTokenData } from "../../services/getTokenData";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const tokenData = getTokenData(token);

  if (!tokenData || tokenData.exp < Date.now() / 1000) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
