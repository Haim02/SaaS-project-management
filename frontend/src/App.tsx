import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/navigate/Navbar";
import Sidebar from "./components/navigate/Sidebar";
import Dashboard from "./pages/Dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProjectBoard from "./pages/ProjectBoard";
import { useAuth } from "./hooks/useAuth";
import ProjectsDashboard from "./pages/ProjectsDashboard";
import UserProfile from "./pages/UserProfile";
import Spinner from "./components/Spinner";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RequireRole from "./components/Require/RequireRole";
import OrganizationGate from "./components/organization/OrganizationGate";
import JoinOrganization from "./components/organization/JoinOrganization";
import CreateOrganization from "./components/organization/CreateOrganization";
import { useLogoutMutation } from "./services/authApi";
import type { User } from "./types/user";
import OrgSettings from "./pages/OrganizationSetting";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuth();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (!isAuthenticated) {
      // navigate("/");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      {isAuthenticated && (
        <Sidebar
          open={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user as User}
        />
      )}
      <main className="flex-1 p-2 overflow-y-auto">
        <Routes>
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

          <Route
            path="/organization/join-organization"
            element={<JoinOrganization />}
          />
          <Route
            path="/organization/create-new-organization"
            element={<CreateOrganization />}
          />

          <Route
            path="/projects"
            element={
              <RequireRole roles={["owner", "admin", "member", "guest"]}>
                <OrganizationGate>
                  <ProjectsDashboard />
                </OrganizationGate>
              </RequireRole>
            }
          />

          <Route
            path="/projects/:projectId"
            element={
              <RequireRole roles={["owner", "admin", "member", "guest"]}>
                <OrganizationGate>
                  <ProjectBoard />
                </OrganizationGate>
              </RequireRole>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequireRole roles={["owner", "admin", "member", "guest"]}>
                <OrganizationGate>
                  <Dashboard />
                </OrganizationGate>
              </RequireRole>
            }
          />

          <Route
            path="/profile"
            element={
              <RequireRole roles={["owner", "admin", "member", "guest"]}>
                <UserProfile />
              </RequireRole>
            }
          />
          <Route
            path="/org/:orgId/settings"
            element={
              <RequireRole roles={["owner", "admin"]}>
                <OrganizationGate>
                  <OrgSettings />
                </OrganizationGate>
              </RequireRole>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
