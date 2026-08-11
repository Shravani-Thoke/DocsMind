const QuizResultsPage = ({ questions, selectedAnswers, onBack }) => {
  const total = questions.length;
  const correct = questions.filter(
    (q, i) => selectedAnswers[i] === q.correctAnswerIndex
  ).length;

  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-5 text-center shadow-sm sm:p-8">
      <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
        Your Score: {percentage}%
      </h2>

      <p>
        {correct} Correct out of {total}
      </p>

      <button
        onClick={onBack}
        className="mt-6 w-full rounded-lg bg-blue-500 px-4 py-3 text-white sm:w-auto"
      >
        Back to Quiz Sets
      </button>
    </div>
  );
};

export default QuizResultsPage;
