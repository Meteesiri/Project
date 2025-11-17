import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box, Theme } from "@radix-ui/themes";
import { useState } from "react";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import UserProfile from "./components/UserProfile";
import { useAuth } from "./hooks/useAuth";
import Sidebar from "./components/Sidebar";
import CourseDetail from "./pages/CourseDetail";

function App() {
  const auth = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <Theme appearance={isDarkMode ? "dark" : "light"} className="h-screen">
      <div className="flex h-full w-full">
        {/* LEFT SIDEBAR */}
        {auth?.isAuthenticated && (
          <div className="w-64 h-full border-r border-[var(--gray-6)]">
            <Sidebar />
          </div>
        )}

        {/* MAIN AREA */}
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* TOP BAR */}
          {auth?.isAuthenticated && (
            <div className="w-full border-b border-[var(--gray-6)] px-4 py-3 flex justify-end">
              <UserProfile
                isDarkMode={isDarkMode}
                onIsDarkModeChange={setIsDarkMode}
              />
            </div>
          )}

          {/* CONTENT */}
          <Box style={{ flexGrow: 1, overflow: "auto" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/courses"
                element={
                  <PrivateRoute>
                    <Courses />
                  </PrivateRoute>
                }
              />
              <Route
                path="/assignments"
                element={
                  <PrivateRoute>
                    <Assignments />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />

              <Route path="/course/:id" element={<CourseDetail />} />
            </Routes>
          </Box>
        </div>
      </div>
    </Theme>
  );
}

export default App;
