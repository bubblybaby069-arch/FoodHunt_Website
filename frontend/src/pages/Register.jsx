import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await api.post("/auth/register", form);

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
  style={{ backgroundImage: `url(https://i.pinimg.com/736x/24/b9/45/24b945feb9af4cc2c0c5084b8a876834.jpg)` }}
>

      {/* Glass Card */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[360px]">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <input
          name="name"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4
          focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Full Name"
        />

        <input
          name="email"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4
          focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Email Address"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6
          focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Password"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-green-500 to-orange-500
          text-white py-2 rounded-lg font-semibold
          hover:from-orange-500 hover:to-red-500
          transition-all duration-300 shadow-md hover:shadow-xl"
        >
          Register
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
