import React from "react";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // Use auth context to get login status
  console.log(isAuthenticated, "isAuthenticated");
  return (
    <div className="flex justify-between p-4 bg-gray-800 text-white">
      <div>
        {isAuthenticated ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        ) : (
          <Link to="/" className="text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
