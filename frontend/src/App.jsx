

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import './App.css'

import Login from "./components/LogIn";
import  Register  from "./components/Register"



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
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
