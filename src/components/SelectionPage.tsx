import React from "react";
import { useNavigate } from "react-router-dom";

const SelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubstringCalculator = () => {
    navigate("/substring");
  };

  const handleBinaryTreeCalculator = () => {
    navigate("/binarytree");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-2xl font-bold">Choose a Calculator</h1>
      <div className="space-x-4">
        <button
          onClick={handleSubstringCalculator}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Substring Calculator
        </button>
        <button
          onClick={handleBinaryTreeCalculator}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Binary Tree Calculator
        </button>
      </div>
    </div>
  );
};

export default SelectionPage;
