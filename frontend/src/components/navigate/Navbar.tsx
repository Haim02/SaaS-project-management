import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import OrgSelector from "../OrgSelector";

type NavbarProps = {
  onToggleSidebar?: () => void;
  onJoin?: () => void;
};

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {isAuthenticated ? (
        <div className="flex items-center sm:gap-4 gap-2">
          <button onClick={onToggleSidebar} className="text-gray-700 text-2xl">
            ☰
          </button>

          {user?.members?.length ? (
            <OrgSelector goAfterChange="projects" />
          ) : null}

          <Link to="/dashboard" className="relative">
            <span className="material-icons text-blue-600">דשבורד</span>
          </Link>
          <Link to="/projects" className="relative hidden sm:block">
            <span className="material-icons text-blue-600">פרויקטים</span>
          </Link>
        </div>
      ) : (
        <div className="flex items-center sm:gap-6 gap-2">
          <Link to="/about" className="text-gray-700 hover:underline">
            אודותינו
          </Link>
          <Link to="/login" className="text-gray-700 hover:underline">
            התחברות
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            הרשמה
          </Link>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img
            src="/favicon.svg"
            alt="Project Management Logo"
            style={{ width: "32", height: "32" }}
            className=""
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
