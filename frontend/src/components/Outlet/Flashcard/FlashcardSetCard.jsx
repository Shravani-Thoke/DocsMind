import { BookOpen, CalendarDays, Layers, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FlashcardSetCard = ({ flashcardSet }) => {
    const navigate = useNavigate();

    const formattedDate = new Date(
        flashcardSet.createdAt
    ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-lg sm:p-6">

            <div className="flex items-center gap-3 mb-5">
                <div className="bg-blue-100 p-3 rounded-xl">
                    <BookOpen className="text-blue-600" size={22} />
                </div>

                <div className="min-w-0">
                    <h3 className="truncate font-semibold text-lg">
                        {flashcardSet.title}
                    </h3>

                    <p className="truncate text-sm text-gray-500">
                        {flashcardSet.documentName}
                    </p>
                </div>
            </div>

            <div className="space-y-2 text-gray-600 text-sm">

                <div className="flex items-center gap-2">
                    <Layers size={16} />
                    <span>{flashcardSet.cardsCount} Cards</span>
                </div>

                <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>{formattedDate}</span>
                </div>

            </div>

            {/* <button
                onClick={() =>
                    navigate(`/flashcard-sets/${flashcardSet._id}`)
                }
                className="mt-6 w-full py-3 rounded-xl font-semibold bg-linear-to-r text-white from-blue-700 to-blue-500 hover:opacity-90 transition disabled:opacity-50 cursor-pointer"

            >
                <Sparkles size={20} className="inline-block mr-2" />
                Study Now
            </button> */}

        </div>
    );
};

export default FlashcardSetCard;
