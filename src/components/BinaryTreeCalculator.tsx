import React, { useState } from "react";
import { calculateBinaryTree } from "../services/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const BinaryTreeCalculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCalculate = async () => {
    try {
      setError("");

      setLoading(true);
      const response = await calculateBinaryTree(input);
      if (response?.data?.success) {
        setResult(JSON.stringify(response.data.data, null, 2));
        setError("");
      } else {
        setError(response?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error calculating binary tree path sum");
    }
  };
  const navigate = useNavigate(); // Initialize navigate

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
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="1,2,null,3 like this"
      />
      {error && <div className="text-red-500">{error}</div>}{" "}
      <button
        onClick={handleCalculate}
        className="w-full p-2 bg-purple-500 text-white rounded mt-2"
      >
        {loading ? "Processing..." : "Calculate"}
      </button>
      <pre className="mt-4 p-2 bg-gray-100 rounded">{result}</pre>
    </div>
  );
};

export default BinaryTreeCalculator;
