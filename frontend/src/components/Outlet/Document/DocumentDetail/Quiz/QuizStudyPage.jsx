import { useEffect, useState } from "react";
import axios from "../../../../../api/axios";
import QuizResultsPage from "./QuizResultsPage";
import { ChevronLeft, ChevronRight, CircleCheck } from "lucide-react";

const QuizStudyPage = ({ setId, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    fetchQuestions();
  }, [setId]);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
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
  }, [questions.length]);

  const fetchQuestions = async () => {
    const res = await axios.get(`/ai/quiz-sets/${setId}`);
    setQuestions(res.data.questions);
  };

  if (showResults) {
    return (
      <QuizResultsPage
        questions={questions}
        selectedAnswers={selectedAnswers}
        onBack={onBack}
      />
    );
  }

  if (!questions.length) return <div>Loading...</div>;

  const question = questions[currentIndex];

  return (
    <div>
      <button className="flex flex-row cursor-pointer" onClick={onBack}>
        <ChevronLeft /> Back
      </button>

      <div className="w-full bg-gray-200 h-2 rounded-full my-6">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() =>
              setSelectedAnswers({
                ...selectedAnswers,
                [currentIndex]: idx,
              })
            }
            className={`w-full border p-4 rounded-xl text-left ${
              selectedAnswers[currentIndex] === idx
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="flex flex-row items-center cursor-pointer text-gray-700"
          disabled={currentIndex === 0}
          onClick={prevCard}
        >
          <ChevronLeft />
          Previous
        </button>

        <div className="flex overflow-x-auto gap-2 hide-scrollbar max-w-150">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`min-w-10 h-10 rounded-lg font-semibold transition
          ${
            currentIndex === index
              ? "bg-blue-600 text-white"
              : selectedAnswers[index] !== undefined
                ? "bg-green-100 text-green-600"
                : "bg-gray-200 text-gray-600"
          }
        `}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentIndex === questions.length - 1 ? (
          <button
            className="flex flex-row items-center bg-emerald-600 text-white px-4 h-auto rounded-lg cursor-pointer hover:bg-emerald-700 transition"
            onClick={() => setShowResults(true)}
          >
            <CircleCheck className="mr-2 h-5" />Submit Quiz
          </button>
        ) : (
          <button
            className="flex flex-row items-center bg-blue-600 text-white px-4 h-auto rounded-lg cursor-pointer hover:bg-blue-700 transition"
            onClick={nextCard}
          >
            Next <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizStudyPage;
