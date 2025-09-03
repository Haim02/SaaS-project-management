import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/navigate/Navbar';
import Sidebar from './components/navigate/Sidebar';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';
import type { RootState } from './services/store/store';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ProjectBoard from './pages/ProjectBoard';
import { useAuth } from './hooks/useAuth';
import ProjectsDashboard from './pages/ProjectsDashboard';
import UserProfile from './pages/UserProfile';
import Spinner from './components/Spinner';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const navigate = useNavigate()
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const {isAuthenticated, isLoading} = useAuth()
  console.log("isAuthenticated ", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      // navigate("/");
    }
  }, [isAuthenticated]);

  if(isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      {isAuthenticated && (
        <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <main className="flex-1 p-2 overflow-y-auto">
        <Routes>
          {/* <Route path="/" element={<Navigate to="/projects" replace />} /> */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate replace to="/" /> : <Register />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectsDashboard />} />
            <Route path="/projects/:projectId" element={<ProjectBoard />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          <Route path="*" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
