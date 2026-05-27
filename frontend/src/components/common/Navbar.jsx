import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🛍️ EcomCatalog
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-item">
              Home
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/admin" className="nav-item admin-badge">
                Admin Panel
              </Link>
            </li>
          )}
          {isAuthenticated ? (
            <li className="user-profile">
              <span className="welcome-text">
                Hi, <strong>{user.username}</strong> ({isAdmin ? "Admin" : "User"})
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-item login-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-item register-btn">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
