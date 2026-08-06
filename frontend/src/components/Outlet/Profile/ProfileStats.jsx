
import {
  FileText,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import StatCard from "../Dashboard/StatCard";

const ProfileStats = ({ stats }) => {
  return (
    <div>

      <h2 className="text-2xl font-semibold mb-5">
        Learning Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          title="Documents"
          value={stats.totalDocuments}
          icon={<FileText size={26} />}
          iconBg="bg-blue-500"
        />

        <StatCard
          title="Flashcards"
          value={stats.totalFlashcards}
          icon={<BookOpen size={26} />}
          iconBg="bg-green-500"
        />

        <StatCard
          title="Quizzes"
          value={stats.totalQuizzes}
          icon={<GraduationCap size={26} />}
          iconBg="bg-purple-500"
        />

      </div>

    </div>
  );
};

export default ProfileStats;