

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import './App.css'

import Login from "./components/LogIn";
import Register  from "./components/Register";
import Landing from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import NewDocument from "./components/NewDocument";
import Documents from "./components/Documents";
import DocumentView from "./components/DocumentView";
import Chat from "./components/Chat";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center bg-[#0d1117] text-gray-400 font-['JetBrains_Mono']">
          Loading...
        </div>
      }>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new_document" element={<NewDocument />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/view_document/:id" element={<DocumentView />} />
          <Route path="/documents/:id/chat" element={<Chat />} />
          <Route path="/documents/:id/flashcards" element={<Flashcards />} />
          <Route path="/documents/:id/quiz" element={<Quiz />} />

          
          {/* <Route path="*" element={<NotFound />} /> */}

          {/* User Protected Routes */}

          {/* <Route path="/allProblems" element={<ProtectedRouteUser><AllProblems /></ProtectedRouteUser>} />
          <Route path="/problem/:id" element={<ProtectedRouteUser><Attempt /></ProtectedRouteUser>} />
          <Route path="/submissions" element={<ProtectedRouteUser><Submissions /></ProtectedRouteUser>} /> */}


          {/* Admin Protected Routes */}
          {/* <Route path="/admin/*" element={<ProtectedRouteAdmin><AdminDashboard /></ProtectedRouteAdmin>} />
          <Route path="/admin/editProblem/:id" element={<ProtectedRouteAdmin><EditProblem /></ProtectedRouteAdmin>} />

          <Route path="/admin/submissions/:problemId" element={<AdminProblemSubmissions />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>

  );
}

export default App
