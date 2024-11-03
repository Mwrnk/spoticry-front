import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlaylists } from "../services/api";

function Home() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlaylists = async () => {
      const playlists = await fetchPlaylists();
      setPlaylists(playlists);
    };
    loadPlaylists();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao SpotiCry!</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Tendências</h2>
        <div className="flex overflow-x-scroll space-x-4">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="min-w-[200px] bg-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-xl font-bold">{playlist._name}</h3>
              <p className="text-sm">{playlist._description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 py-2 border-t border-gray-700 flex justify-around lg:hidden">
        <button
          onClick={() => navigate("/home")}
          className="py-2 px-4 text-white text-lg"
        >
          Início
        </button>
        <button
          onClick={() => navigate("/search")}
          className="py-2 px-4 text-white text-lg"
        >
          Procurar
        </button>
        <button
          onClick={() => navigate("/playlists")}
          className="py-2 px-4 text-white text-lg"
        >
          Minhas Músicas
        </button>
      </div>
    </div>
  );
}

export default Home;
