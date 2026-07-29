import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-100 p-6 rounded-xl shadow-xl w-120">
        <h2 className="text-xl font-bold mb-4 ">
          Delete Flashcard Set?
        </h2>

        <p className="mb-4 text-sm text-gray-600">
            Are you sure you want to delete this flashcard set?
          This action cannot be undone. All flashcards inside this set will be permanently deleted.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50 cursor-pointer hover:bg-red-600  transition"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;