import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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

  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: message }
    ]);
    setMessage("");

    // Placeholder AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a sample explanation. Later, responses will be generated only from your document."
        }
      ]);
    }, 600);
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

      {/* ---------- CHAT MESSAGES (SCROLLABLE) ---------- */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-28">
        <div className="max-w-5xl mx-auto space-y-6">
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              role={msg.role}
              content={msg.content}
            />
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* ---------- FIXED INPUT BAR ---------- */}
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            className="px-5 py-3 rounded-xl bg-blue-600
                       hover:bg-blue-700 transition
                       text-sm sm:text-base font-medium"
          >
            Ask
          </button>
        </div>
      </div>
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
            : "bg-[#161a22] text-gray-200 border border-white/5 rounded-bl-md"}
        `}
      >
        {content}
      </div>
    </div>
  );
}

export default Chat;
