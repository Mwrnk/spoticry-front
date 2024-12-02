import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Discover from "./pages/Discover";
import Playlists from "./pages/Playlists";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { UserProvider } from "./context/userContext";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/songs" element={<Songs />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
