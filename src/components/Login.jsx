import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import spoticryIcon from "../assets/spoticry.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    const result = await login(email, password);

    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-zinc-900 px-10 py-20 rounded-3xl border-2 border-zinc-600">
          <h1 className="text-5xl font-semibold">Bem-vindo de volta!</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Não possui uma conta?{" "}
            <span className="font-small text-lg text-sky-500">
              Cadastre-se.
            </span>
          </p>
          <div className="mt-8">
            <div>
              <label className="text-lg font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-zinc-600 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Digite seu email"
              />
            </div>
            <div className="mt-4">
              <label className="text-lg font-medium">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-zinc-600 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Digite sua senha"
              />
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                onClick={handleLogin}
                className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 rounded-xl bg-gradient-to-r from-sky-500 to-green-500 text-white text-lg font-bold"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-800">
        <div className="bg-circle w-60 h-60 bg-gradient-to-tr from-sky-500 to-green-500 rounded-full transition-transform duration-200 ease-out animate-spin"></div>
        <img
          src={spoticryIcon}
          alt="Spoticry Icon"
          className="icon absolute w-20 h-20 drop-shadow-xl "
        />
      </div>
    </div>
  );
}

export default Login;
