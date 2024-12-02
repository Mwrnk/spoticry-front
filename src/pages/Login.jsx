import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/users";
import logotipo from "../assets/logotipo.svg";
import useForm from "../hooks/useForm";
import Art from "../assets/SideArt.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginForm = () => {
  const [form, onChange, clear] = useForm({ email: "", password: "" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(form, navigate);
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen bg-zinc-900" role="main">
      <ToastContainer />
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="px-10 py-20" role="form" aria-labelledby="login-title">
          <img src={logotipo} alt="Logotipo Spoticry" className="mb-8" />
          <h1 id="login-title" className="text-5xl font-semibold">
            Bem-vindo de volta!
          </h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Entre com sua conta.
          </p>
          <div className="mt-8">
            <div>
              <label htmlFor="email" className="text-lg font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required={true}
                value={form.email}
                onChange={onChange}
                className="w-full border-2 border-zinc-600 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Digite seu email"
                aria-required="true"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="text-lg font-medium">
                Senha
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                className="w-full border-2 border-zinc-600 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Digite sua senha"
                aria-required="true"
              />
            </div>
            {error && (
              <p className="text-red-500 mt-4" role="alert">
                {error}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                onClick={onSubmitLogin}
                type="submit"
                className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 rounded-xl bg-gradient-to-r from-custom-blue to-custom-purple text-white text-lg font-bold"
                disabled={isLoading}
                aria-busy={isLoading}
                title="Fazer login"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-150">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              <button
                onClick={() => navigate("/")}
                className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all mt-4 py-4 rounded-xl bg-gray-200 text-gray-700 text-lg font-bold"
                title="Voltar para a página inicial"
              >
                Voltar para a página inicial
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <div
          className="bg-white p-16 rounded-3xl shadow-lg flex flex-col items-center w-3/4 h-3/4"
          role="complementary"
        >
          <p className="text-center text-2xl font-bold font-serif text-gray-700 mb-4">
            Crie playlists e ouça quando e onde quiser!
          </p>
          <img src={Art} alt="Spoticry Icon" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
