import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", form);

      if (data.success) {
        if (data.token) localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success(data.message);

        data.user.role === "admin"
          ? navigate("/admin")
          : navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
  style={{ backgroundImage: `url(https://i.pinimg.com/1200x/b6/2e/6f/b62e6f9189a410768442f4c3eaa10ec7.jpg)` }}
>

      <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-2xl w-[360px]">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2
                       focus:ring-orange-400 transition"
          />

          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2
                       focus:ring-orange-400 transition"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 via-orange-500 to-red-500
                       text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90
                       transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          New user?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
