import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>Bem-vindo à página inicial!</p>
      <button
        onClick={handleLogout}
        className="mt-8 py-2 px-4 bg-red-500 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
