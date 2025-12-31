import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [recentDocs, setRecentDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentDocs() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/document`,
          {
            headers: {
              token: sessionStorage.getItem("token")
            }
          }
        );

        // Take latest 3 documents
        setRecentDocs((res.data.docs || []).slice(0, 3));
      } catch (err) {
        console.error("Fetch recent documents failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentDocs();
  }, []);

  return (
    <div className='min-h-screen bg-[#0f1115] text-white font-["Montserrat"] px-4 sm:px-6 py-15'>

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-1">
          Your personal learning space
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <ActionCard
          title="Add New Document"
          desc="Paste notes or upload learning material"
          link="/new_document"
          primary
        />
        <ActionCard
          title="View All Documents"
          desc="Continue learning from your saved content"
          link="/documents"
        />
      </div>

      {/* RECENT DOCUMENTS */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Recent Documents
        </h2>

        {loading ? (
          <div className="text-gray-400 text-sm">
            Loading recent documents...
          </div>
        ) : recentDocs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentDocs.map((doc) => (
              <RecentDocCard key={doc._id} doc={doc} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

/* ---------------- RECENT DOC CARD ---------------- */

function RecentDocCard({ doc }) {
  return (
    <Link
      to={`/view_document/${doc._id}`}
      className="block p-5 rounded-xl bg-[#161a22] border border-white/5
                 hover:bg-[#1c2230] transition"
    >
      <h3 className="text-sm font-medium mb-2 line-clamp-2">
        {doc.title}
      </h3>

      <div className="flex justify-between text-xs text-gray-400">
        <span>
          {doc.source === "pdf" ? "PDF" : "Text"}
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
    <div className="border border-white/5 rounded-xl bg-[#161a22] p-6 text-center text-gray-400">
      <p className="text-sm sm:text-base">
        No documents yet.
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

/* ---------------- ACTION CARD ---------------- */

function ActionCard({ title, desc, link, primary }) {
  return (
    <Link
      to={link}
      className={`p-6 rounded-xl border border-white/5 transition
        ${primary
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-[#161a22] hover:bg-[#1c2230]"}`}
    >
      <h3 className="text-lg font-medium mb-2">
        {title}
      </h3>
      <p className={`text-sm ${primary ? "text-blue-100" : "text-gray-400"}`}>
        {desc}
      </p>
    </Link>
  );
}

export default Dashboard;
