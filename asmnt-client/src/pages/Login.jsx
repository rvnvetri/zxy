import { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://localhost:7030/api/auth/login", formData);
      console.log("Login successful:", response.data);
      // store token if needed: localStorage.setItem('token', response.data.token);
      // redirect to dashboard
    } catch (err) {
      console.error("Login error", err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md shadow-lg bg-white p-8 rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <div className="alert alert-error mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
