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
    <div className="mx-auto w-full max-w-3xl">
      <button className="flex items-center text-sm text-gray-700 cursor-pointer sm:text-base" onClick={onBack}>
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

      <p className="mb-2 text-sm font-medium text-gray-500">Question {currentIndex + 1} of {questions.length}</p>
      <h2 className="mb-6 break-words text-xl font-semibold sm:text-2xl">{question.question}</h2>

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
            className={`w-full break-words border p-3 rounded-xl text-left transition sm:p-4 ${
              selectedAnswers[currentIndex] === idx
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to question ${index + 1}`}
              className={`h-10 min-w-10 rounded-lg font-semibold transition ${
                currentIndex === index
                  ? "bg-blue-600 text-white"
                  : selectedAnswers[index] !== undefined
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="flex flex-row items-center justify-between gap-3">
        <button
          className="flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
          disabled={currentIndex === 0}
          onClick={prevCard}
        >
          <ChevronLeft />
          Previous
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            className="flex flex-1 items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-white cursor-pointer transition hover:bg-emerald-700 sm:flex-none"
            onClick={() => setShowResults(true)}
          >
            <CircleCheck className="mr-2 h-5" />Submit Quiz
          </button>
        ) : (
          <button
            className="flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white cursor-pointer transition hover:bg-blue-700 sm:flex-none"
            onClick={nextCard}
          >
            Next <ChevronRight />
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default QuizStudyPage;
