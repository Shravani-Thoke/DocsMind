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
      className="group p-6 relative bg-white shadow-md rounded-2xl cursor-pointer hover:shadow-blue-500 transition"
    >

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.(set);
        }}
        className="absolute top-5 right-5 text-lg text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* ICON */}
      <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
        <Brain className="w-8 h-8 text-blue-500" />
      </div>

      <h3 className="text-lg font-semibold mb-2">{set.title}</h3>

      <p className="text-sm text-gray-500 mb-4">Created {date}</p>

      <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
        {set.totalCards} cards
      </div>
    </div>
  );
};

export default FlashcardSetCard;