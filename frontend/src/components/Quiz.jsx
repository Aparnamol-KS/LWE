import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Quiz() {
    const { id } = useParams();

    const questions = [
        {
            question: "What is CPU scheduling?",
            options: [
                "Allocating memory to processes",
                "Selecting which process uses the CPU",
                "Managing I/O devices",
                "Handling file systems"
            ],
            correctIndex: 1,
            explanation:
                "CPU scheduling decides which process in the ready queue gets access to the CPU."
        },
        {
            question: "Why is CPU scheduling important?",
            options: [
                "It reduces memory usage",
                "It improves CPU utilization and response time",
                "It increases disk speed",
                "It removes deadlocks"
            ],
            correctIndex: 1,
            explanation:
                "Scheduling improves overall system performance and responsiveness."
        }
    ];

    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [checked, setChecked] = useState(false);
    const [saved, setSaved] = useState(false);

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

    const saveQuiz = () => {
        // later → API call to save full quiz
        setSaved(true);
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
                    <h1 className="text-2xl sm:text-3xl font-semibold mt-2">
                        Quiz
                    </h1>
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
                            const isCorrect = checked && idx === q.correctIndex;
                            const isWrong = checked && isSelected && idx !== q.correctIndex;

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
                                        }
                                    `}
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
                                {selected === q.correctIndex
                                    ? "Correct 👍"
                                    : "Not quite — explanation below"}
                            </p>
                            <p>{q.explanation}</p>
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
                        ) : isLastQuestion ? (
                            <button
                                onClick={saveQuiz}
                                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
                            >
                                Save quiz
                            </button>
                        ) : (
                            <button
                                onClick={next}
                                className="px-6 py-3 rounded-xl bg-[#0f1115]
                                           border border-white/10 hover:bg-[#1c2230]"
                            >
                                Next
                            </button>
                        )}
                    </div>

                    {/* SAVE CONFIRMATION */}
                    {saved && isLastQuestion && (
                        <p className="mt-4 text-center text-sm text-green-400">
                            Quiz saved ✓
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Quiz;
