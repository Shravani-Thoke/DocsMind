import { FileText } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const DocumentCard = ({doc}) => {
  const navigate = useNavigate();
const getTimeAgo = (dateString) => {
  const uploaded = new Date(dateString).getTime();
  const now = Date.now();
  const diffMs = now - uploaded;

  if (Number.isNaN(uploaded) || diffMs < 0) return "just now";

  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
};


  return (
    <button 
    onClick={() => navigate(`/documents/${doc._id}`)}
    className="w-full bg-white rounded-2xl p-5 text-left shadow-sm border border-gray-100 
                hover:shadow-md sm:p-6 sm:hover:-translate-y-1 
                transition-all duration-200 cursor-pointer">

  <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
    <FileText/>
  </div>

  <h3 className="mt-4 truncate font-semibold text-gray-800 text-md leading-tight">
    {doc.title}
  </h3>

  <p className="text-xs text-gray-500 mt-1">
    {(doc.fileSize / 1024).toFixed(1)} KB
  </p>

  <div className="mt-4 flex flex-wrap gap-2">
    <span className="whitespace-nowrap text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">
      {doc.flashcardsCount} Flashcards
    </span>

    <span className="whitespace-nowrap text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-medium">
      {doc.quizzesCount} Quizzes
    </span>
  </div>

  {/* Footer */}
  <div className="flex items-center gap-2 text-xs text-gray-400 mt-5">
    
    <span>Uploaded {getTimeAgo(doc.createdAt)}</span>

  </div>
</button>

  )
}

export default DocumentCard
