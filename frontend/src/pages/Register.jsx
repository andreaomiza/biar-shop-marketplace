import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getUserFromStorage } from "../utils/auth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    role: "cliente",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(form);
    if (result?.success) {
      const user = getUserFromStorage();
      if (user?.role === "vendedor") {
        navigate("/seller-dashboard");
      } else {
        navigate("/");
      }
    } else {
      setError(result?.message || "No se pudo registrar");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#000414] to-[#2A4272]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#ff0044]">
          Registro
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          name="email"
          type="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
          required
        />
        <input
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
          required
        />
        <div className="relative mb-4">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-[#ff0044]"
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {/* Aquí puedes agregar íconos de ojo si usas Heroicons o similares */}
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none"
        >
          <option value="cliente">Cliente</option>
          <option value="vendedor">Vendedor</option>
        </select>
        <button
          type="submit"
          className="w-full bg-[#ff0044] hover:bg-[#e00068] text-white py-2 rounded-lg font-semibold"
        >
          Crear cuenta
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-[#e00068]">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
