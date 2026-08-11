import { useState } from "react";

const FlashcardViewer = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="h-64 w-full max-w-150 cursor-pointer perspective sm:h-75"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute flex h-full w-full items-center justify-center rounded-2xl bg-white p-5 text-center shadow-xl sm:p-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="break-words text-lg font-medium sm:text-xl">
            {flashcard.question}
          </h2>
        </div>

        <div
          className="absolute flex h-full w-full items-center justify-center rounded-2xl bg-green-600 p-5 text-center text-white shadow-xl rotate-y-180 sm:p-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="break-words text-lg font-medium sm:text-xl">
            {flashcard.answer}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FlashcardViewer;
