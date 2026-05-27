import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar({ onSearchChange }) {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchValue);
    }
  };

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="main-navbar">
      <div className="nav-container">
        {/* Left: Logo */}
        <div className="nav-left">
          <Link to="/home" className="nav-logo">
            🛍️ EcomCatalog
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="nav-center">
          <Link to="/home" className={`nav-link ${location.pathname === "/home" ? "active" : ""}`}>
            Home
          </Link>
          <a href="#categories" className="nav-link">
            Categories
          </a>
        </div>

        {/* Right: Search, Cart, Avatar */}
        <div className="nav-right">
          {location.pathname === "/home" && (
            <form className="nav-search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search products..."
                value={searchValue}
                onChange={handleSearchInput}
              />
            </form>
          )}

          {/* Cart Icon Link */}
          <Link to="/cart" className="nav-cart-btn">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* User Profile Dropdown */}
          {user && (
            <div className="nav-user-dropdown">
              <button className="nav-avatar-btn" onClick={toggleDropdown}>
                <span className="nav-avatar-char">{user.username.charAt(0).toUpperCase()}</span>
                <span className="nav-username">{user.username}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-user-info">
                    <strong>{user.username}</strong>
                    <span className="dropdown-user-email">{user.email || "user@ecom.com"}</span>
                  </div>
                  <hr />
                  <button className="dropdown-item" onClick={() => navigate("/profile")}>
                    👤 Profile
                  </button>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
