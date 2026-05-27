import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const remembered = localStorage.getItem("remembered_user");
    if (remembered) {
      setUsername(remembered);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(username, password);
      if (rememberMe) {
        localStorage.setItem("remembered_user", username);
      } else {
        localStorage.removeItem("remembered_user");
      }
      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Invalid credentials. Please double check your details."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-split-page">
      {/* Left side: Brand Illustration/Gradient Panel */}
      <div className="login-brand-panel">
        <div className="brand-overlay"></div>
        <div className="brand-panel-content">
          <span className="brand-panel-icon">🛍️</span>
          <h1 className="brand-panel-title">EcomCatalog</h1>
          <p className="brand-panel-tagline">
            Discover, curate, and experience the finest items in real-time. Secure, fast, and gorgeous.
          </p>
          <div className="brand-decorations">
            <div className="decor-circle decor-1"></div>
            <div className="decor-circle decor-2"></div>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="login-form-panel">
        <div className="login-form-container">
          <h2>Welcome Back</h2>
          <p className="form-subtitle">Enter your security credentials to access the catalog</p>

          {error && <div className="inline-error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form-tag">
            <div className="form-input-wrapper">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                placeholder="Enter username (e.g. user, admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-input-wrapper password-group">
              <label htmlFor="login-password">Password</label>
              <div className="password-input-row">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password (e.g. user123, admin123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <div className="form-options-row">
              <label className="checkbox-container-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkbox-custom-box"></span>
                Remember me
              </label>
              <a href="#forgot" className="forgot-password-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-submit-cta" disabled={submitting}>
              {submitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="auth-form-switcher">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
