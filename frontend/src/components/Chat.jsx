import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; 

function Chat() {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ask any question based on this document. I’ll explain it in simple terms."
    }
  ]);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const chatEndRef = useRef(null);

  function showToast(message, type = "success") {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  }


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage }
    ]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`http://localhost:3000/api/ai/chat/${id}`, {
        question: userMessage
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.answer }
      ]);
    } catch (err) {
      showToast("Failed to get answer", "error");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn’t generate an answer right now. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen bg-[#0f1115] text-white font-["Montserrat"] flex flex-col'>

      {/* ---------- HEADER ---------- */}
      <div className="border-b border-white/5 px-4 sm:px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <Link
            to={`/view_document/${id}`}
            className="text-sm text-blue-300 hover:underline"
          >
            ← Back to document
          </Link>
          <h1 className="text-2xl sm:text-3xl font-semibold mt-2">
            Ask Doubts
          </h1>
          <p className="text-sm text-gray-400">
            Answers are based only on this document
          </p>
        </div>
      </div>

      {/* ---------- CHAT MESSAGES ---------- */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-28">
        <div className="max-w-5xl mx-auto space-y-6">
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              role={msg.role}
              content={msg.content}
            />
          ))}

          {loading && (
            <MessageBubble
              role="assistant"
              content="Thinking…"
            />
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* ---------- INPUT BAR ---------- */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f1115] border-t border-white/5 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <textarea
            rows="1"
            placeholder="Ask a question about this document…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 resize-none px-4 py-3 rounded-xl
                       bg-[#161a22] text-white
                       border border-white/10
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-sm sm:text-base"
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`px-5 py-3 rounded-xl text-sm sm:text-base font-medium transition
              ${loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Asking..." : "Ask"}
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

/* ---------- MESSAGE BUBBLE ---------- */

function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] sm:max-w-[70%] px-5 py-4 rounded-2xl
          text-sm sm:text-base leading-relaxed
          ${isUser
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-[#161a22] text-gray-200 border border-white/5 rounded-bl-md"}`}
      >
        {content}
      </div>
    </div>
  );
}

export default Chat;
