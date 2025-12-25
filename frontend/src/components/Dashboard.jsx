import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className='min-h-screen bg-[#0f1115] text-white font-["Montserrat"] px-4 sm:px-6 py-15'>

      {/* ---------------- HEADER ---------------- */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-1">
          Your personal learning space
        </p>
      </div>

      {/* ---------------- QUICK ACTIONS ---------------- */}
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

      {/* ---------------- RECENT DOCUMENTS ---------------- */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Recent Documents
        </h2>

        {/* Empty State (replace later with real data) */}
        <div className="border border-white/5 rounded-xl bg-[#161a22] p-6 text-center text-gray-400">
          <p className="text-sm sm:text-base">
            No documents yet.
          </p>
          <Link
            to="/documents/new"
            className="inline-block mt-4 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white"
          >
            Add your first document
          </Link>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ title, desc, link, primary }) {
  return (
    <Link
      to={link}
      className={`p-6 rounded-xl border border-white/5 transition
        ${primary ? "bg-blue-600 hover:bg-blue-700" : "bg-[#161a22] hover:bg-[#1c2230]"}`}
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
