const QuizResultsPage = ({ questions, selectedAnswers, onBack }) => {
  const total = questions.length;
  const correct = questions.filter(
    (q, i) => selectedAnswers[i] === q.correctAnswerIndex
  ).length;

  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">
        Your Score: {percentage}%
      </h2>

      <p>
        {correct} Correct out of {total}
      </p>

      <button
        onClick={onBack}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Back to Quiz Sets
      </button>
    </div>
  );
};

export default QuizResultsPage;