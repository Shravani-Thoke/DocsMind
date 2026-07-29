import React, { useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";
import axios from "../../../api/axios";
import UploadModal from "./UploadModal";

const Document = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);


  const fetchDocuments = async () => {
    try {
      const res = await axios.get("/document/getAllDocuments");
      setDocuments(Array.isArray(res.data?.documents) ? res.data.documents : []);
    } catch (err) {
      console.error(err);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-2xl font-semibold">My Documents</h1>
          <p className="text-gray-500">
            Manage and organize your learning materials
          </p>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => setIsOpen(true)}>
          + Upload Document
        </button>
      </div>
      {loading ? (
        <p className="text-gray-500 mt-6">Loading documents...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <DocumentCard key={doc._id || doc.id} doc={doc} />
            ))
          ) : (
            <p className="text-gray-500 ">
              No documents found.
              <br />
              Start by uploading your first document!
            </p>
          )}
        </div>
      )}
      {isOpen && (
        <UploadModal
          onClose={() => setIsOpen(false)}
          onUploaded={fetchDocuments}
        />
      )}
    </div>
  );
};

export default Document;
