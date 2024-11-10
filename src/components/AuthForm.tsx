import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../services/api"; // Assuming these API functions exist
import { setToken } from "../utils/auth";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

interface AuthFormProps {
  type: "signup" | "login";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, loginTrue } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    const data = { email, password };

    try {
      let response: any;
      if (type === "signup") {
        response = await signup(data); // Call sign-up API
        if (response?.data?.success) {
          navigate("/"); // Redirect to login page after successful sign-up
          setEmail("");
          setPassword("");
        } else {
          setError(
            response?.data?.message || "Sign-up failed. Please try again."
          );
        }
      } else {
        response = await login(data); // Call login API
        if (response?.data?.success) {
          setToken(response?.data?.data.token);
          loginTrue();
        } else {
          setError(
            response?.data?.message ||
              "Login failed. Please check your credentials."
          );
        }
      }
    } catch (err) {
      setError("An error occurred while processing your request."); // Error handling for API failures
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold">
        {type === "login" ? "Log In" : "Sign Up"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 border rounded shadow"
      >
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={loading} // Disable input while loading
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={loading} // Disable input while loading
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}{" "}
        {/* Display error message */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Processing..." : type === "login" ? "Log In" : "Sign Up"}
        </button>
        {type === "login" && (
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-full py-2 bg-gray-500 text-white rounded mt-2"
          >
            Don't have an account? Sign Up
          </button>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
