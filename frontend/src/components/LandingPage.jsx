import { Link } from "react-router-dom";

function Landing() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div className='bg-[#0f1115] text-white font-["Montserrat"]'>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Listen With Eyes
          </h1>

          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            An accessibility-first learning platform designed to help
            hearing-impaired students understand lectures through
            structured text and interactive tools.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-center"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition text-center"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-center"
              >
                Go to Dashboard
              </Link>
            )}
          </div>

          {/* Optional subtle hint */}
          {isLoggedIn && (
            <p className="mt-4 text-sm text-gray-500">
              You’re already signed in.
            </p>
          )}
        </div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#161a22]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
            About LWE
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
            Traditional classrooms and online lectures rely heavily on
            spoken explanations. Hearing-impaired students often miss
            important details, emphasis, and real-time clarifications.
            <br /><br />
            Listen With Eyes focuses on understanding — not just
            transcription — by transforming learning content into
            readable, structured, and interactive study material.
          </p>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10">
            How It Works
          </h2>

          <div className="space-y-5 text-gray-400 text-sm sm:text-base">
            <div className="border-l-2 border-blue-600 pl-4">
              Students add lecture text, notes, or documents
            </div>
            <div className="border-l-2 border-blue-600 pl-4">
              Content becomes their personal learning material
            </div>
            <div className="border-l-2 border-blue-600 pl-4">
              AI tools generate explanations, flashcards, and quizzes
            </div>
            <div className="border-l-2 border-blue-600 pl-4">
              Learning happens at their own pace, without audio dependency
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#161a22]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10">
            Key Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Feature
              title="Document-Centered Learning"
              desc="All learning tools are derived from the student’s own notes and content."
            />
            <Feature
              title="Ask-Anytime Doubts"
              desc="Students can ask questions without interrupting or feeling hesitant."
            />
            <Feature
              title="Flashcards & Quizzes"
              desc="Auto-generated study tools that help with revision and understanding."
            />
            <Feature
              title="Accessibility-First Design"
              desc="Clean text, calm UI, and zero dependency on audio."
            />
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="py-6 text-center text-gray-500 text-xs sm:text-sm border-t border-white/5 px-4">
        © {new Date().getFullYear()} Listen With Eyes. Built with accessibility in mind.
      </footer>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="p-5 sm:p-6 rounded-xl border border-white/5 bg-[#0f1115]">
      <h3 className="text-base sm:text-lg font-medium mb-2">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">
        {desc}
      </p>
    </div>
  );
}

export default Landing;
