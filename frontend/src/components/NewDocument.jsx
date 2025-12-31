import { useState } from "react";
import axios from "axios";

function NewDocument() {
  const [mode, setMode] = useState("paste"); // paste | upload | transcription
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

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

  async function saveDocument() {
    if (isSaving) return;

    if (!title.trim()) {
      showToast("Title is required", "error");
      return;
    }

    try {
      setIsSaving(true);

      if (mode === "paste") {
        if (!content.trim()) {
          showToast("Content cannot be empty", "error");
          return;
        }

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/document/paste`,
          { title, content },
          {
            headers: {
              token: sessionStorage.getItem("token")
            }
          }
        );

        showToast("Document saved successfully");
        setTitle("");
        setContent("");

      } else if (mode === "upload") {
        if (!file) {
          showToast("Please select a PDF file", "error");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/document/upload`,
          formData,
          {
            headers: {
             token: sessionStorage.getItem("token")
            }
          }
        );

        showToast("PDF uploaded and processed successfully");
        setTitle("");
        setFile(null);
      }

    } catch (err) {
      console.error(err);
      showToast(
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className='min-h-screen bg-[#0f1115] text-white font-["Montserrat"] px-4 sm:px-6 py-15'>
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
          Add New Document
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mb-8">
          Add your learning material to start understanding better.
        </p>

        {/* MODE SELECT */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <ModeButton
            active={mode === "paste"}
            onClick={() => setMode("paste")}
            label="Copy & Paste"
            disabled={isSaving}
          />
          <ModeButton
            active={mode === "upload"}
            onClick={() => setMode("upload")}
            label="Upload PDF"
            disabled={isSaving}
          />
          <ModeButton
            active={mode === "transcription"}
            onClick={() => setMode("transcription")}
            label="Transcription (Coming Soon)"
            disabled
          />
        </div>

        {/* FORM */}
        <div className="bg-[#161a22] border border-white/5 rounded-xl p-6">

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">
              Document title
            </label>
            <input
              type="text"
              value={title}
              disabled={isSaving}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Eg: Operating Systems – CPU Scheduling"
              className="w-full px-4 py-3 rounded-lg bg-[#0f1115] text-white
                         border border-white/10 focus:outline-none
                         focus:ring-2 focus:ring-blue-500
                         disabled:opacity-60"
            />
          </div>

          {/* Paste Mode */}
          {mode === "paste" && (
            <textarea
              rows="10"
              disabled={isSaving}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste lecture notes, captions, or study material here..."
              className="w-full px-4 py-3 rounded-lg bg-[#0f1115] text-white
                         border border-white/10 focus:outline-none
                         focus:ring-2 focus:ring-blue-500
                         disabled:opacity-60"
            />
          )}

          {/* Upload Mode */}
          {mode === "upload" && (
            <input
              type="file"
              accept=".pdf"
              disabled={isSaving}
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-gray-400
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:bg-blue-600 file:text-white
                         hover:file:bg-blue-700
                         disabled:opacity-60"
            />
          )}

          {/* Submit */}
          <button
            onClick={saveDocument}
            disabled={isSaving}
            className={`mt-6 px-6 py-3 rounded-lg transition cursor-pointer
              ${isSaving
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {isSaving ? "Saving..." : "Save Document"}
          </button>
        </div>
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
