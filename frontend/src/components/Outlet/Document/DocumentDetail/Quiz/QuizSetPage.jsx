import React from "react";
import QuizStudyPage from "./QuizStudyPage";
import { NotepadText, Plus } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../../../api/axios";
import QuizSetCard from "./QuizSetCard";
import GenerateQuizModal from "./GenerateQuizModal";

const QuizSetPage = ({documentId}) => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetchSets();
  }, [documentId]);

  const fetchSets = async () => {
    try {
      const res = await api.get(`/ai/${documentId}/quiz-sets`);
      setSets(res.data.sets);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  // 👇 If set selected → show study page
  if (selectedSetId) {
    return (
      <QuizStudyPage
        setId={selectedSetId}
        onBack={() => setSelectedSetId(null)}
      />
    );
  }

  return (
    <div>
      {sets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="bg-blue-100 p-4 rounded-2xl mb-4">
            <NotepadText className="text-blue-500 w-6 h-6" />
          </div>

          <h3 className="text-lg font-semibold text-gray-800">
            No quizzes yet
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Generate quizzes from this document to test your understanding and retention.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Generate Quiz
          </button>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="mb-6 flex justify-end">

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white cursor-pointer hover:bg-blue-600 sm:w-auto"
            >
              <Plus className="w-4 h-4" /> Generate Quiz
            </button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {sets.map((set) => (
              <QuizSetCard
                key={set._id}
                set={set}
                onSelect={() => setSelectedSetId(set._id)}
              />
            ))}
          </div>
        </>
      )}

      {/* MODALS (always outside ternary for stability) */}
      {isModalOpen && (
        <GenerateQuizModal
          documentId={documentId}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchSets}
        />
      )}
    </div>
  );
};

export default QuizSetPage;
