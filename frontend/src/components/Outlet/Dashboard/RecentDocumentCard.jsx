import React from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const RecentDocumentCard = ({ doc }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 border-gray-200 rounded-xl p-5 flex justify-between items-center hover:shadow-md transition">

            <div className="flex gap-4 items-center">

                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">

                    <HiOutlineDocumentText
                        size={26}
                        className="text-blue-600"
                    />

                </div>

                <div>

                    <h3 className="font-semibold">
                        {doc.fileName}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {new Date(doc.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>

                </div>

            </div>

            <button
                onClick={() => navigate(`/documents/${doc._id}`)}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
                View
            </button>

        </div>
    );
};

export default RecentDocumentCard;