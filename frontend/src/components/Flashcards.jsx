import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Flashcards() {
  const { id } = useParams();

  // ✅ Demo flashcards (replace with backend later)
  const [flashcards] = useState([
    {
      front: "What is CPU scheduling?",
      back: "CPU scheduling is the process by which the operating system selects which process should use the CPU next."
    },
    {
      front: "Why is CPU scheduling important?",
      back: "It improves CPU utilization, throughput, and response time."
    },
    {
      front: "Name one CPU scheduling algorithm.",
      back: "First Come First Serve (FCFS), Shortest Job First (SJF), or Round Robin."
    }
  ]);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [saved, setSaved] = useState(false);

  // 🔔 Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  function showToast(message, type = "success") {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  }

  const currentCard = flashcards[index];

  const flipCard = () => {
    // ✅ small intentional delay for flip feel
    setTimeout(() => {
      setFlipped((f) => !f);
    }, 150);
  };

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((prev) =>
      prev === 0 ? flashcards.length - 1 : prev - 1
    );
  };

  const saveFlashcards = () => {
    setSaved(true);
    showToast("Flashcards saved successfully ✅");
  };

  return (
    <div className='min-h-screen bg-[#0f1115] text-white font-["Montserrat"] px-4 sm:px-6 py-15'>
      <div className="max-w-4xl mx-auto">

        {/* ---------- HEADER ---------- */}
        <div className="mb-6">
          <Link
            to={`/view_document/${id}`}
            className="text-sm text-blue-300 hover:underline"
          >
            ← Back to document
          </Link>

          <div className="flex items-center gap-3 mt-2">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Flashcards
            </h1>

            {/* ✅ SAVED BADGE */}
            {saved && (
              <span className="text-xs px-3 py-1 rounded-full
                               bg-green-600/20 text-green-400
                               border border-green-500/30">
                Flashcards saved
              </span>
            )}
          </div>

          <p className="text-sm text-gray-400 mt-1">
            Review key concepts at your own pace
          </p>
        </div>

        {/* ---------- COUNTER ---------- */}
        <div className="text-sm text-gray-400 mb-4 text-center">
          Card {index + 1} of {flashcards.length}
        </div>

        {/* ---------- FLASHCARD ---------- */}
        <div
          onClick={flipCard}
          className={`cursor-pointer border border-white/5 rounded-2xl
                      p-8 sm:p-10 min-h-[220px]
                      flex items-center justify-center text-center
                      transition-all duration-300
                      ${
                        flipped
                          ? "bg-[#0f172a] text-blue-200 scale-[1.01]"
                          : "bg-[#161a22] text-white"
                      }
                      hover:bg-[#1c2230]`}
        >
          <p className="text-base sm:text-lg leading-relaxed">
            {flipped ? currentCard.back : currentCard.front}
          </p>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Tap or click the card to flip
        </p>

        {/* ---------- CONTROLS ---------- */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevCard}
            className="px-5 py-3 rounded-xl bg-[#161a22]
                       border border-white/10 hover:bg-[#1c2230]
                       text-sm sm:text-base"
          >
            Previous
          </button>

          <button
            onClick={nextCard}
            className="px-5 py-3 rounded-xl bg-[#161a22]
                       border border-white/10 hover:bg-[#1c2230]
                       text-sm sm:text-base"
          >
            Next
          </button>
        </div>

        {/* ---------- SAVE SECTION ---------- */}
        <div className="mt-6 flex justify-center">
          {!saved ? (
            <button
              onClick={saveFlashcards}
              className="px-6 py-3 rounded-xl bg-blue-600
                         hover:bg-blue-700 transition
                         text-sm sm:text-base"
            >
              Save these flashcards
            </button>
          ) : (
            <p className="text-sm text-green-400">
              Flashcards saved ✓
            </p>
          )}
        </div>

      </div>

      {/* 🔔 TOAST */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-sm
            ${toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"}`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Flashcards;
