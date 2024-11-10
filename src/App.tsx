import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import AuthForm from "./components/AuthForm";
import SelectionPage from "./components/SelectionPage";
import SubstringCalculator from "./components/SubstringCalculator";
import BinaryTreeCalculator from "./components/BinaryTreeCalculator";
import Navbar from "./components/Navbar"; // Import Navbar

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar /> {/* Navbar appears on all pages */}
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<AuthForm type="login" />} />
            <Route path="/signup" element={<AuthForm type="signup" />} />
            <Route path="/selection" element={<SelectionPage />} />
            <Route path="/substring" element={<SubstringCalculator />} />
            <Route path="/binarytree" element={<BinaryTreeCalculator />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
