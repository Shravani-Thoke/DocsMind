import { useEffect, useState } from "react";
import FlashcardSetCard from "./FlashcardSetCard";
import FlashcardStudyPage from "./FlashcardStudyPage";
import axios from "../../../../../api/axios";
import { Brain, Plus } from "lucide-react";
import DeleteModal from "./DeleteModal";
import GenerateFlashcard from "./generateFlashcard";

const FlashCardSetsPage = ({ documentId }) => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchSets();
  }, [documentId]);

  const fetchSets = async () => {
    try {
      const res = await axios.get(`/ai/${documentId}/flashcard-sets`);
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
      <FlashcardStudyPage
        setId={selectedSetId}
        onBack={() => setSelectedSetId(null)}
      />
    );
  }

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await axios.delete(`/ai/flashcard-sets/${deleteTarget._id}`);

      setDeleteTarget(null);
      fetchSets();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleteLoading(false);
    }
  };

 return (
  <div>
    {sets.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="bg-blue-100 p-4 rounded-2xl mb-4">
          <Brain className="text-blue-500 w-6 h-6" />
        </div>

        <h3 className="text-lg font-semibold text-gray-800">
          No flashcard sets yet
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Generate flashcards from this document to start learning!
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Generate New Set
        </button>
      </div>
    ) : (
      <>
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Flashcard Sets</h2>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Generate New Set
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sets.map((set) => (
            <FlashcardSetCard
              key={set._id}
              set={set}
              onSelect={() => setSelectedSetId(set._id)}
              onDelete={() => setDeleteTarget(set)}
            />
          ))}
        </div>
      </>
    )}

    {/* MODALS (always outside ternary for stability) */}
    {isModalOpen && (
      <GenerateFlashcard
        documentId={documentId}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchSets}
      />
    )}

    <DeleteModal
      isOpen={!!deleteTarget}
      onClose={() => setDeleteTarget(null)}
      onConfirm={handleDelete}
      loading={deleteLoading}
    />
  </div>
);
};

export default FlashCardSetsPage;
