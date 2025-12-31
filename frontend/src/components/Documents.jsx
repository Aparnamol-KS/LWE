import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" // success | error
  });

  function showToast(message, type = "success") {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  }

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/document`,
          {
            headers: {
              token: sessionStorage.getItem("token")
            }
          }
        );
        setDocuments(res.data.docs || []);
      } catch (err) {
        console.error("Fetch documents failed:", err);
        showToast("Failed to load documents", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/document/${id}`,
        {
          headers: {
            token: sessionStorage.getItem("token")
          }
        }
      );

      setDocuments((prev) =>
        prev.filter((doc) => doc._id !== id)
      );

      showToast("Document deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      showToast("Failed to delete document", "error");
    }
  }

  return (
    <div className='min-h-screen bg-[#0f1115] text-white font-["Montserrat"] px-4 sm:px-6 py-15'>
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              My Documents
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
              All your learning material in one place
            </p>
          </div>

          <Link
            to="/new_document"
            className="mt-4 sm:mt-0 inline-block px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-center"
          >
            Add Document
          </Link>
        </div>

        {/* CONTENT */}
        {loading ? (
          <LoadingState />
        ) : documents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <DocumentCard
                key={doc._id}
                doc={doc}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* TOAST */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-sm
            ${toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"}
          `}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

/* ---------------- DOCUMENT CARD ---------------- */

function DocumentCard({ doc, onDelete }) {
  return (
    <div className="relative">
      {/* DELETE BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onDelete(doc._id);
        }}
        className="absolute top-3 right-3 text-xs text-red-400
                   hover:text-red-500 transition"
      >
        Delete
      </button>

      <Link
        to={`/view_document/${doc._id}`}
        className="block p-5 rounded-xl bg-[#161a22] border border-white/5
                   hover:bg-[#1c2230] transition"
      >
        <h3 className="text-lg font-medium mb-2 line-clamp-2">
          {doc.title}
        </h3>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>
            {doc.source === "pdf" ? "PDF Upload" : "Text Document"}
          </span>
          <span>
            {new Date(doc.createdAt).toLocaleDateString()}
          </span>
        </div>
      </Link>
    </div>
  );
}

/* ---------------- EMPTY STATE ---------------- */

function EmptyState() {
  return (
    <div className="text-center border border-white/5 rounded-xl bg-[#161a22] p-10 text-gray-400">
      <p className="text-sm sm:text-base">
        You haven’t added any documents yet.
      </p>
      <Link
        to="/new_document"
        className="inline-block mt-4 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white"
      >
        Add your first document
      </Link>
    </div>
  );
}

/* ---------------- LOADING STATE ---------------- */

function LoadingState() {
  return (
    <div className="text-center text-gray-400 py-20">
      Loading your documents...
    </div>
  );
}

export default Documents;
