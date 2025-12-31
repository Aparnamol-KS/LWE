import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Quiz() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔔 Toast state
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
    async function fetchQuiz() {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/ai/quiz/${id}`,
          {},
          {
            headers: {
              token: sessionStorage.getItem("token")
            }
          }
        );

        setQuestions(res.data.quiz.questions);
        setSaved(res.data.saved);
      } catch (err) {
        console.error("Failed to load quiz:", err);
        showToast("Failed to load quiz", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [id]);

  // ✅ Single guard
  if (loading || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f1115] text-white flex items-center justify-center">
        Loading quiz...
      </div>
    );
  }

  const q = questions[current];
  const isLastQuestion = current === questions.length - 1;

  const checkAnswer = () => {
    if (selected === null) return;
    setChecked(true);
  };

  const next = () => {
    setSelected(null);
    setChecked(false);
    setCurrent((c) => Math.min(c + 1, questions.length - 1));
  };

  const prev = () => {
    setSelected(null);
    setChecked(false);
    setCurrent((c) => Math.max(c - 1, 0));
  };

  const saveQuiz = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/quiz/${id}/save`,
        { quiz: { questions } },
        {
          headers: {
            token: sessionStorage.getItem("token")
          }
        }
      );
      setSaved(true);
      showToast("Quiz saved successfully ✅");
    } catch (err) {
      console.error("Failed to save quiz:", err);
      showToast("Failed to save quiz", "error");
    }
  };

  return (
    <div className='min-h-screen bg-[#0f1115] text-white font-["Montserrat"] flex flex-col'>

      {/* HEADER */}
      <div className="px-4 sm:px-6 py-5 pt-10 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <Link
            to={`/view_document/${id}`}
            className="text-sm text-blue-300 hover:underline"
          >
            ← Back to document
          </Link>

          <div className="flex items-center gap-3 mt-2">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Quiz
            </h1>

            {/* ✅ QUIZ SAVED BADGE */}
            {saved && (
              <span className="text-xs px-3 py-1 rounded-full
                               bg-green-600/20 text-green-400 border border-green-500/30">
                Quiz already saved
              </span>
            )}
          </div>

          <p className="text-sm text-gray-400">
            Question {current + 1} of {questions.length}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 px-4 sm:px-6 py-10">
        <div className="max-w-3xl mx-auto bg-[#161a22]
                        border border-white/5 rounded-2xl
                        p-6 sm:p-8">

          <h2 className="text-base sm:text-lg font-medium mb-6">
            {q.question}
          </h2>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selected === idx;
              const isCorrect = checked && idx === q.correctAnswer;
              const isWrong = checked && isSelected && idx !== q.correctAnswer;

              return (
                <button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  disabled={checked}
                  className={`w-full text-left px-4 py-3 rounded-xl border
                    transition text-sm sm:text-base
                    ${isCorrect
                      ? "bg-green-600/20 border-green-500 text-green-300"
                      : isWrong
                      ? "bg-red-600/20 border-red-500 text-red-300"
                      : isSelected
                      ? "bg-blue-600/20 border-blue-500 text-white"
                      : "bg-[#0f1115] border-white/10 hover:bg-[#1c2230]"
                    }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* FEEDBACK */}
          {checked && (
            <div className="mt-6 text-sm sm:text-base text-gray-400">
              <p className="font-medium text-gray-200 mb-1">
                {selected === q.correctAnswer
                  ? "Correct 👍"
                  : "Not quite — try reviewing the content"}
              </p>
            </div>
          )}

          {/* ACTIONS */}
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={prev}
              disabled={current === 0}
              className="px-5 py-3 rounded-xl bg-[#0f1115]
                         border border-white/10 hover:bg-[#1c2230]
                         disabled:opacity-50"
            >
              Previous
            </button>

            {!checked ? (
              <button
                onClick={checkAnswer}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
              >
                Check Answer
              </button>
            ) : isLastQuestion && !saved ? (
              <button
                onClick={saveQuiz}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
              >
                Save quiz
              </button>
            ) : !isLastQuestion ? (
              <button
                onClick={next}
                className="px-6 py-3 rounded-xl bg-[#0f1115]
                           border border-white/10 hover:bg-[#1c2230]"
              >
                Next
              </button>
            ) : null}
          </div>

          {/* SAVE CONFIRMATION (inline) */}
          {saved && isLastQuestion && (
            <p className="mt-4 text-center text-sm text-green-400">
              Quiz saved ✓
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

export default Quiz;
