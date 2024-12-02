import { Link } from "react-router-dom";
import logo from "../assets/logotipo.svg";

function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-zinc-950 to-zinc-900 min-h-screen">
      <header className="flex justify-between items-center p-4">
        <img src={logo} alt="Logotipo" className="h-12" />
        <Link to="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign In
          </button>
        </Link>
      </header>
      <main className="flex flex-col items-center justify-center text-center mt-12">
        <h1 className="text-8xl font-bold">Descubra o som que move você.</h1>
        <h3 className="text-2xl mt-6"> Ouça suas músicas favoritas agora.</h3>
        <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded">
          Tente agora
        </button>
        <div className="mt-12 animate-spin-slow"></div>
      </main>
    </div>
  );
}

export default LandingPage;
