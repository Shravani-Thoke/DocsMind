import { useRef, useState } from "react";
import axios from "../../../api/axios";
import { X, UploadCloud, Check } from "lucide-react";

export default function UploadModal({ onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      await axios.post("/document/upload", formData);

      if (typeof onUploaded === "function") {
        await onUploaded();
      }
      onClose();
    } catch (err) {
      console.error("Upload failed:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 ">
      <div className="bg-white text-black w-120 h-100 rounded-2xl p-6 relative shadow-2xl">
        <span className="text-xl font-semibold mb-4 block">
            Upload your Document
        </span>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-3 text-gray-600 hover:text-black transition cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Drag Area */}
        <div
          onClick={() => fileInputRef.current.click()}
          className={`border-2 border-dashed rounded-xl h-56 flex flex-col items-center justify-center cursor-pointer transition
          ${
            file
              ? "border-green-500 bg-green-500/5"
              : "border-gray-600 hover:border-blue-500"
          }`}
        >
          {file ? (
            <>
              <Check size={40} className="text-green-800 mb-4" />
              <p className="text-black mb-2">File selected</p>
              <p className="text-green-800 text-sm break-all px-6 text-center">
                {file.name}
              </p>
            </>
          ) : (
            <>
              <UploadCloud size={40} className="text-gray-500 mb-4" />
              <p className="text-gray-500">Click to upload</p>
            </>
          )}

          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Upload Button */}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="mt-6 w-full py-3 rounded-xl font-semibold bg-linear-to-r from-blue-600 to-blue-400 hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}
