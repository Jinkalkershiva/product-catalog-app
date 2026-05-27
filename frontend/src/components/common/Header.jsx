import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../CartDrawer";

function Header() {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
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
                Hi, <strong>{user.username}</strong>
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

          {/* Interactive Cart Button */}
          <li>
            <button className="cart-toggle-btn" onClick={() => setIsCartOpen(true)}>
              <span className="cart-icon">🛒</span>
              <span className="cart-text">Cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </li>
        </ul>
      </div>

      {/* Slide-over Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}

export default Header;
