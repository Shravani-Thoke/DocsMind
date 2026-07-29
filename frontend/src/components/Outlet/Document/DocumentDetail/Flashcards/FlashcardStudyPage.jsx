import { useEffect, useState } from "react";
import FlashcardViewer from "./FlashcardViewer";
import axios from "../../../../../api/axios";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const FlashcardStudyPage = ({ setId, onBack }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchCards();
  }, [setId]);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`/ai/flashcard-sets/${setId}`);
      setFlashcards(res.data.flashcards);
    } catch (err) {
      console.error(err);
    }
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : prev));
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextCard();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevCard();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [flashcards.length]);

  if (flashcards.length === 0)
    return <div className="p-6">No flashcards found.</div>;

  return (
    
    <div className="flex flex-col items-center ">
      <button
        onClick={onBack}
        className="text-blue-600 mb-6 flex gap-2 self-start hover:cursor-pointer"
      >
        <ArrowLeft/> Back to Sets
      </button>
      <FlashcardViewer
        key={flashcards[currentIndex]?._id || currentIndex}
        flashcard={flashcards[currentIndex]}
      />
      <div className="flex gap-6 mt-6">
        <button
          disabled={currentIndex === 0}
          onClick={prevCard}
          className="px-4 py-2 flex flex-row gap-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
        >
          <ChevronLeft />Previous
        </button>

        <span className="bg-gray-100 px-4 py-2 rounded-lg">
          {currentIndex + 1} / {flashcards.length}
        </span>

        <button
          disabled={currentIndex === flashcards.length - 1}
          onClick={nextCard}
          className="px-4 py-2 flex flex-row gap-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
        >
          Next <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default FlashcardStudyPage;
