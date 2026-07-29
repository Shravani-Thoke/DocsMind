import { useState } from "react";

const FlashcardViewer = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-150 h-75 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute w-full h-full bg-white shadow-xl rounded-2xl flex items-center justify-center p-8 text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="text-xl font-medium">
            {flashcard.question}
          </h2>
        </div>

        <div
          className="absolute w-full h-full bg-green-600 text-white shadow-xl rounded-2xl flex items-center justify-center p-8 text-center rotate-y-180"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="text-xl font-medium">
            {flashcard.answer}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FlashcardViewer;
