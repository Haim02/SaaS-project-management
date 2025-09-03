import { useLogoutMutation } from "../../services/authApi";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon } from '@heroicons/react/24/outline';

type NavbarProps = {
  onToggleSidebar?: () => void;
};

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const {user, isAuthenticated} = useAuth()


  const handleLogout = async() => {
    await logout().unwrap();
    navigate('/')
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar} className="text-gray-700 text-2xl">
            ☰
          </button>

          <input
            type="text"
            placeholder="חפש..."
            className="hidden md:block border rounded-lg px-3 py-2 text-sm"
          />

          <Link to="/dashboard" className="relative">
            <span className="material-icons text-gray-600">דשבורד</span>
          </Link>
          <Link to="/projects" className="relative">
            <span className="material-icons text-gray-600">פרויקטים</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/profile">
              <UserCircleIcon className="h-6 w-6 text-gray-500" />
            </Link>
            <span className="hidden md:inline font-medium">
              {user?.name ?? "משתמש"}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              התנתק
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <a href="/about" className="text-gray-700 hover:underline">
            אודותינו
          </a>
          <a href="/login" className="text-gray-700 hover:underline">
            התחברות
          </a>
          <a
            href="/register"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            הרשמה
          </a>
        </div>
      )}
      <div className="text-xl font-bold text-blue-600 cursor-pointer">
        <Link to="/">מנהל פרויקטים</Link>
      </div>
    </nav>
  );
};

export default Navbar;
