import { Link } from "react-router-dom";
import logo from "../assets/logotipo.svg";
import headphone from "../assets/headphone.png";
import gradientBackground from "../assets/gradient.png";

function LandingPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${gradientBackground})` }}
    >
      <div className="absolute top-4 left-4 flex items-center space-x-6 text-white">
        <img src={logo} alt="Logo" />
      </div>
      <div className="absolute top-4 right-4 flex items-center space-x-8 text-white">
        <a
          href="https://github.com/Mwrnk/spoticry-front"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-medium hover:underline"
        >
          Github
        </a>
        <Link
          to="/login"
          className="text-lg font-medium flex items-center hover:underline"
        >
          Sign in <span className="ml-1">→</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between w-full">
        <div className="text-left text-white space-y-4 md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold leading-snug">
            Sua música, <br />
            Seu momento, <br />
            Em qualquer lugar.
          </h2>
        </div>

        {/* Direita: Imagem */}
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-end">
          <img src={headphone} alt="Fone de ouvido" className="w-80 h-auto" />
        </div>
      </div>

      {/* Footer inferior */}
      <div className="absolute bottom-4 w-full text-center text-sm text-white">
        Criado por Matheus Werneck, Pedro Marzao e Tiago Malaquias
      </div>
    </div>
  );
}

export default LandingPage;
