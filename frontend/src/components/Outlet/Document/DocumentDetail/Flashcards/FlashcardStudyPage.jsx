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
    
    <div className="flex w-full flex-col items-center">
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
      <div className="mt-6 flex w-full flex-wrap items-center gap-3 sm:w-auto sm:flex-nowrap sm:gap-6">
        <button
          disabled={currentIndex === 0}
          onClick={prevCard}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-2 cursor-pointer hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
        >
          <ChevronLeft />Previous
        </button>

        <span className="order-first w-full rounded-lg bg-gray-100 px-4 py-2 text-center sm:order-none sm:w-auto">
          {currentIndex + 1} / {flashcards.length}
        </span>

        <button
          disabled={currentIndex === flashcards.length - 1}
          onClick={nextCard}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-2 cursor-pointer hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
        >
          Next <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default FlashcardStudyPage;
