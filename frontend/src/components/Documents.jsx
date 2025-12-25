import { Link } from "react-router-dom";

function Documents() {
  // Temporary dummy data (replace with API later)
  const documents = [
    {
      _id: "1",
      title: "Operating Systems – CPU Scheduling",
      source: "paste",
      createdAt: "2025-01-10"
    },
    {
      _id: "2",
      title: "Computer Networks – Unit 1",
      source: "pdf",
      createdAt: "2025-01-12"
    },
    {
      _id: "3",
      title: "Computer Networks – Unit 1",
      source: "pdf",
      createdAt: "2025-01-12"
    }
  ];

  return (
    <div className='min-h-screen bg-[#0f1115] text-white font-["Montserrat"] px-4 sm:px-6 py-15'>
      <div className="max-w-5xl mx-auto">

        {/* ---------------- HEADER ---------------- */}
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

        {/* ---------------- DOCUMENTS LIST ---------------- */}
        {documents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <DocumentCard key={doc._id} doc={doc} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

/* ---------------- DOCUMENT CARD ---------------- */

function DocumentCard({ doc }) {
  return (
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
        to="/documents/new"
        className="inline-block mt-4 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white"
      >
        Add your first document
      </Link>
    </div>
  );
}

export default Documents;
