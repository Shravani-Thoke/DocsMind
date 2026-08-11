import { useEffect, useState } from "react";
import api from "../../../api/axios";
import FlashcardSetCard from "./FlashcardSetCard";

const Flashcards = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await api.get("/flashcards");
      setFlashcardSets(res.data.flashcardSets);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Flashcards</h1>
        <p className="text-gray-500">
          Study and review all your flashcard sets.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {flashcardSets.map((set) => (
          <FlashcardSetCard
            key={set._id}
            flashcardSet={set}
          />
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
