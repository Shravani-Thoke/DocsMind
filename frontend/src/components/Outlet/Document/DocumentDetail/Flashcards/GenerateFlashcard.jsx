import React from "react";
import api from "../../../../../api/axios";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";

const GenerateFlashcard = ({ documentId, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!title.trim()) return;
    try {
      setLoading(true);
      setError("");

      await api.post(`/ai/${documentId}/flashcard-sets`, {
        documentId,
        title,
        count: parseInt(count),
      });
      onSuccess(); // refresh sets
      onClose();
    } catch (err) {
      console.error("Failed to generate flashcards:", err);
      setError(
        err.response?.data?.message ||
          "Failed to generate flashcards. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 ">
        <div className="bg-white text-black w-100 h-auto rounded-2xl p-6 relative shadow-2xl">
          <span className="text-xl font-semibold mb-4 block">
            Generate Flashcards
          </span>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-2 top-3 text-gray-600 hover:text-black transition cursor-pointer"
          >
            <X size={20} />
          </button>

          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            required
          />
          <input
            type="number"
            placeholder="Number of cards"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            required
          />

          {/* Upload Button */}
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

          <button
            onClick={handleUpload}
            disabled={loading || !title}
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

export default GenerateFlashcard;
