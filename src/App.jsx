import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={<ProtectedRoute>{/* Componente de Busca */}</ProtectedRoute>}
        />
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              {/* Componente de Minhas Músicas */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
