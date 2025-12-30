import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function DocumentView() {
  const { id } = useParams();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocument() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/document/${id}`,
          {
            headers: {
              token: sessionStorage.getItem("token")
            }
          }
        );

        setDocument(res.data.doc);
      } catch (err) {
        console.error("Fetch document failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDocument();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1115] text-gray-400 flex items-center justify-center">
        Loading document...
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-[#0f1115] text-gray-400 flex items-center justify-center">
        Document not found.
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#0f1115] text-white font-["Montserrat"] px-4 sm:px-6 py-10'>
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <Link
            to="/documents"
            className="text-sm text-blue-300 hover:underline"
          >
            ← Back to documents
          </Link>

          <h1 className="text-3xl font-semibold mt-6">
            {document.title}
          </h1>

          <div className="text-xs sm:text-sm text-gray-400 mt-1">
            {document.source === "pdf" ? "PDF Document" : "Text Document"} •{" "}
            {new Date(document.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* DOCUMENT CONTENT */}
          <div className="lg:col-span-2 bg-[#161a22] border border-white/5 rounded-xl p-6
                max-h-[70vh] overflow-y-auto">

            <h2 className="text-xl font-semibold mb-2">
              Document Content
            </h2>

            <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {document.content}
            </div>
          </div>

          {/* TOOLS PANEL */}
          <div className="bg-[#161a22] border border-white/5 rounded-xl p-6
                sticky top-6 h-fit">

            <h2 className="text-lg font-medium mb-4">
              Learning Tools
            </h2>

            <div className="space-y-3">
              <ToolButton
                title="Ask Doubts"
                desc="Ask questions based on this document"
                link={`/documents/${id}/chat`}
              />
              <ToolButton
                title="Flashcards"
                desc="Revise key concepts"
                link={`/documents/${id}/flashcards`}
              />
              <ToolButton
                title="Quiz"
                desc="Check your understanding"
                link={`/documents/${id}/quiz`}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------------- TOOL BUTTON ---------------- */

function ToolButton({ title, desc, link }) {
  return (
    <Link
      to={link}
      className="block p-4 rounded-lg bg-[#0f1115] border border-white/10
                 hover:bg-[#1c2230] transition"
    >
      <h3 className="text-sm font-medium mb-1">
        {title}
      </h3>
      <p className="text-xs text-gray-400">
        {desc}
      </p>
    </Link>
  );
}

export default DocumentView;
