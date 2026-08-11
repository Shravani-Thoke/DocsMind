import { Sparkles, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import api from "../../../../../api/axios";

const GenerateQuizModal = ({ documentId, onClose, onSuccess }) => {
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    try {
      const parsedCount = parseInt(count);

      if (!parsedCount || parsedCount < 1) {
        setError("Please enter a valid number of questions");
        return;
      }
      setLoading(true);
      setError("");

      await api.post(`/ai/${documentId}/quiz-sets`, {
        id: documentId,
        questionCount: parsedCount,
      });

      onSuccess(); // refresh sets
      onClose();
    } catch (err) {
      console.error("Failed to generate quiz:", err);
      setError(
        err.response?.data?.message ||
          "Failed to generate quiz. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
        <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 text-black shadow-2xl sm:p-6">
          <span className="text-xl font-semibold mb-4 block">
            Generate a Quiz
          </span>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-2 top-3 text-gray-600 hover:text-black transition cursor-pointer"
          >
            <X size={20} />
          </button>

          <input
            type="number"
            min="1"
            max="20"
            placeholder="Number of questions"
            value={count || ""}
            onChange={(e) => setCount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          {/* Upload Button */}
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

          <button
            onClick={handleUpload}
            disabled={loading || !count}
            className="mt-6 w-full py-3 rounded-xl font-semibold bg-linear-to-r text-white from-blue-600 to-blue-400 hover:opacity-90 transition disabled:opacity-50"
          >
            <Sparkles size={20} className="inline-block mr-2" />
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateQuizModal;
