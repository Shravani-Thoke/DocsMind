import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../../api/axios";
import { ChevronLeft } from "lucide-react";
import Chat from "./DocumentDetail/Chat";
import FlashCardSetsPage from "./DocumentDetail/Flashcards/FlashCardSetsPage";
import QuizSetPage from "./DocumentDetail/Quiz/QuizSetPage";

const DocumentDetail = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [activeTab, setActiveTab] = useState("content");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchDocument = async () => {
    try {
      const res = await axios.get(`/document/${id}`);
      setDoc(res.data.doc);
    } catch (err) {
      console.error("Fetch document failed:", {
        id,
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchDocument();
  else setLoading(false);
}, [id]);

if (loading) return <p className="text-gray-500 mt-6">Loading...</p>;
if (!doc) return <p className="text-gray-500 mt-6">Document not found.</p>;


  return (
    <div className="space-y-4">
      <button 
      onClick={() => navigate("/documents")}
      className="text-md text-blue-600 flex flex-row hover: cursor-pointer">
        <ChevronLeft />Back to Documents
        </button>

      <h1 className="break-words text-2xl font-semibold">{doc.title}</h1>

      {/* Tabs */}
      <div className="flex gap-5 overflow-x-auto border-b whitespace-nowrap sm:gap-6">
        {["content", "chat", "flashcards", "quizzes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize cursor-pointer ${
              activeTab === tab
                ? "border-b-3 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="h-auto rounded-xl bg-white p-4 shadow sm:p-6">
        {activeTab === "content" && (
          <div className="h-[60vh] min-h-96 overflow-hidden rounded-xl bg-white shadow sm:h-[70vh]">
            <iframe
              src={doc.filePath}
              className="w-full h-full"
              title="PDF Viewer"
            />
          </div>
        )}
        {activeTab === "chat" && <Chat documentId={id} />}
        {activeTab === "flashcards" && <FlashCardSetsPage documentId={id} />}
        {activeTab === "quizzes" && <QuizSetPage documentId={id} />}
      </div>
    </div>
  );
};

export default DocumentDetail;
