import { Award, NotepadText, Play } from "lucide-react";
import React from "react";

const QuizSetCard = ({ set, onSelect }) => {
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
      className="group p-6 relative bg-white shadow-md rounded-2xl hover:shadow-blue-500 transition"
    >
      {/* ICON */}
      {/* <div className="bg-blue-100 text-blue-500 w-20 h-auto flex items-center justify-start rounded-md mb-4 p-1 font-medium">
        <Award className="w-3 h-3" />{" "}
        <p className="text-xs">Score: {set.score}</p>
      </div> */}

      <h3 className="text-lg font-semibold mb-2">{set.title}</h3>

      <p className="text-sm text-gray-500 mb-4">Created {date}</p>

      <div className="inline-block bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
        {set.totalQuestions} Questions
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="flex items-center justify-center w-full h-10 mt-3 text-sm bg-linear-to-r text-white from-blue-600 to-blue-500 px-3 py-1 rounded-lg font-semibold hover: bg-blue-700 cursor-pointer  transition"
      >
        <Play className="w-4 h-4 font-semibold inline mr-1" />Start Quiz
      </button>
    </div>
  );
};

export default QuizSetCard;
