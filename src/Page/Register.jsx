import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      username: {
        firstName: formData.firstname,
        lastName: formData.lastname,
      },
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await registerUser(payload);
      if (res?.user && res?.token) {
        localStorage.setItem('motiToken', res.token)
        setMessage("🎉 Account created successfully!");
        setTimeout(() => navigate("/feed"), 1500);
      } else {
        setMessage(res?.message || "Something went wrong. Try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-1">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Your journey to motivation starts here 🚀
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="John"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </div>

          <button
          
            type="submit"
            disabled={loading}
            className={`w-full mt-4 text-white font-semibold py-2 rounded-lg transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
        )}

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
