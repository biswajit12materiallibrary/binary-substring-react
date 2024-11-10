import React, { useState } from "react";
import { calculateSubstring } from "../services/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const SubstringCalculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleCalculate = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await calculateSubstring(input);
      if (response?.data?.success) {
        setResult(JSON.stringify(response.data.data, null, 2));
      } else {
        setError(response?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error calculating substring");
    }
  };

  const handleBack = () => {
    navigate("/selection"); // Navigate to the SelectionPage
  };

  return (
    <div className="p-4 border rounded">
      <button
        onClick={handleBack}
        className="p-2 m-3 bg-blue-500 text-white rounded"
      >
        Back to Selection
      </button>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter string"
      />
      {error && <div className="text-red-500">{error}</div>}{" "}
      <button
        onClick={handleCalculate}
        className="w-full p-2 bg-green-500 text-white rounded mt-2"
      >
        {loading ? "Processing..." : "Calculate"}
      </button>
      <div className="mt-4">Result: {result}</div>
    </div>
  );
};

export default SubstringCalculator;
