import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-gray-100 p-5 shadow-xl sm:p-6">
        <h2 className="text-xl font-bold mb-4 ">
          Delete Flashcard Set?
        </h2>

        <p className="mb-4 text-sm text-gray-600">
            Are you sure you want to delete this flashcard set?
          This action cannot be undone. All flashcards inside this set will be permanently deleted.
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 cursor-pointer transition hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-500 px-4 py-2 text-white disabled:opacity-50 cursor-pointer transition hover:bg-red-600"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
