import { Brain, Trash2 } from "lucide-react";

const FlashcardSetCard = ({ set, onSelect, onDelete }) => {
  const parsedDate = new Date(set.createdAt);
  const date = Number.isNaN(parsedDate.getTime())
    ? "Unknown date"
    : new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(parsedDate);

  return (
    <div
      onClick={onSelect}
      className="group relative cursor-pointer rounded-2xl bg-white p-5 shadow-md transition hover:shadow-blue-500 sm:p-6"
    >

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.(set);
        }}
        aria-label="Delete flashcard set"
        className="absolute right-4 top-4 text-lg text-gray-400 opacity-100 transition-opacity duration-200 cursor-pointer hover:text-red-600 sm:right-5 sm:top-5 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* ICON */}
      <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
        <Brain className="w-8 h-8 text-blue-500" />
      </div>

      <h3 className="mb-2 truncate pr-7 text-lg font-semibold">{set.title}</h3>

      <p className="text-sm text-gray-500 mb-4">Created {date}</p>

      <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
        {set.totalCards} cards
      </div>
    </div>
  );
};

export default FlashcardSetCard;
