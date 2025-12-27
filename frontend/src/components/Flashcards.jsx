import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Flashcards() {
  const { id } = useParams();

  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const res = await axios.post(`http://localhost:3000/api/ai/flashcards/${id}`,{}, {
          headers: {
            token: localStorage.getItem("token")
          }
        });
        setFlashcards(res.data.flashcards);
        setSaved(res.data.saved);
      } catch (err) {
        showToast("Failed to load flashcards", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchFlashcards();
  }, [id]);

  const currentCard = flashcards[index];

  const flipCard = () => {
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


  const saveFlashcards = async () => {
    if (saved) {
      showToast("Flashcards already saved", "error");
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/ai/flashcards/${id}/save`, {
        flashcards
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      });

      setSaved(true);
      showToast("Flashcards saved successfully ");
    } catch (err) {
      showToast("Failed to save flashcards", "error");
    }
  };

  // ⏳ Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1115] text-gray-400">
        Generating flashcards...
      </div>
    );
  }

  // ❌ No flashcards
  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1115] text-gray-400">
        No flashcards available
      </div>
    );
  }

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
                      ${flipped
              ? "bg-[#0f172a] text-blue-200 scale-[1.01]"
              : "bg-[#161a22] text-white"
            }
                      hover:bg-[#1c2230]`}
        >
          <p className="text-base sm:text-lg leading-relaxed">
            {flipped ? currentCard.answer : currentCard.question}
          </p>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Tap or click the card to flip
        </p>

        {/* ---------- CONTROLS ---------- */}
        <div className="flex justify-center gap-4 mt-8">
          <button onClick={prevCard} className="px-5 py-3 rounded-xl bg-[#161a22] border border-white/10 hover:bg-[#1c2230]">
            Previous
          </button>
          <button onClick={nextCard} className="px-5 py-3 rounded-xl bg-[#161a22] border border-white/10 hover:bg-[#1c2230]">
            Next
          </button>
        </div>

        {/* ---------- SAVE ---------- */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={saveFlashcards}
            disabled={saved}
            className={`px-6 py-3 rounded-xl text-sm sm:text-base transition
              ${saved
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {saved ? "Already saved" : "Save these flashcards"}
          </button>
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
