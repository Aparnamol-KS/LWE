import { useState } from "react";

function NewDocument() {
  const [mode, setMode] = useState("paste"); // paste | upload | transcription
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  return (
    <div className='min-h-screen bg-[#0f1115] text-white font-["Montserrat"] px-4 sm:px-6 py-15'>
      <div className="max-w-4xl mx-auto">

        {/* ---------------- HEADER ---------------- */}
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
          Add New Document
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mb-8">
          Add your learning material to start understanding better.
        </p>

        {/* ---------------- MODE SELECT ---------------- */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <ModeButton
            active={mode === "paste"}
            onClick={() => setMode("paste")}
            label="Copy & Paste"
          />
          <ModeButton
            active={mode === "upload"}
            onClick={() => setMode("upload")}
            label="Upload PDF"
          />
          <ModeButton
            active={mode === "transcription"}
            onClick={() => setMode("transcription")}
            label="Transcription (Coming Soon)"
            disabled
          />
        </div>

        {/* ---------------- FORM ---------------- */}
        <div className="bg-[#161a22] border border-white/5 rounded-xl p-6">

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">
              Document title
            </label>
            <input
              type="text"
              placeholder="Eg: Operating Systems – CPU Scheduling"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0f1115] text-white
                         border border-white/10 focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Paste Mode */}
          {mode === "paste" && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Paste your content
              </label>
              <textarea
                rows="10"
                placeholder="Paste lecture notes, captions, or study material here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#0f1115] text-white
                           border border-white/10 focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Upload Mode */}
          {mode === "upload" && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Upload PDF file
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-gray-400
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-lg file:border-0
                           file:bg-blue-600 file:text-white
                           hover:file:bg-blue-700"
              />
            </div>
          )}

          {/* Transcription Placeholder */}
          {mode === "transcription" && (
            <div className="text-gray-400 text-sm">
              Live transcription will be available in a future update.
            </div>
          )}

          {/* Submit */}
          <button
            className="mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Save Document
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function ModeButton({ label, active, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg text-sm border transition
        ${active
          ? "bg-blue-600 border-blue-600 text-white"
          : "bg-[#161a22] border-white/10 text-gray-400 hover:bg-[#1c2230]"}
        ${disabled && "opacity-50 cursor-not-allowed"}
      `}
    >
      {label}
    </button>
  );
}

export default NewDocument;
