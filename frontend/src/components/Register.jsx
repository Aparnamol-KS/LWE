import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setError("");

    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });

      navigate('/login')

    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#0f1115] font-["Montserrat"]'>
      <div className="w-full max-w-md bg-[#161a22] p-8 rounded-2xl shadow-lg border border-white/5">

        <h2 className="text-2xl font-semibold text-white mb-2">
          Create your account
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Start learning with visual clarity
        </p>

        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full name"
            value={username}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0f1115] text-white border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0f1115] text-white border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0f1115] text-white border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg bg-blue-600 text-white font-medium
                       hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
