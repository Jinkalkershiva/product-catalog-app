import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./RegisterPage.css";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Password validations
    if (password.length < 6) {
      setError("⚠️ Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("⚠️ Passwords do not match. Please verify.");
      return;
    }

    setSubmitting(true);

    try {
      await register(username, email, password, fullName);
      setSuccess("🎉 Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please check your data."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-split-page">
      {/* Left side: Brand Illustration */}
      <div className="login-brand-panel">
        <div className="brand-overlay"></div>
        <div className="brand-panel-content">
          <span className="brand-panel-icon">🛍️</span>
          <h1 className="brand-panel-title">EcomCatalog</h1>
          <p className="brand-panel-tagline">
            Experience the next generation of online catalogue indexing. Fast, secure, role-managed access.
          </p>
          <div className="brand-decorations">
            <div className="decor-circle decor-1"></div>
            <div className="decor-circle decor-2"></div>
          </div>
        </div>
      </div>

      {/* Right side: Register Form */}
      <div className="login-form-panel">
        <div className="login-form-container">
          <h2>Create Account</h2>
          <p className="form-subtitle">Register to discover thousands of premium listings</p>

          {error && <div className="inline-error-alert">{error}</div>}
          {success && <div className="inline-success-alert">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form-tag">
            <div className="form-input-wrapper">
              <label htmlFor="reg-fullname">Full Name</label>
              <input
                id="reg-fullname"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-input-wrapper">
              <label htmlFor="reg-username">Username</label>
              <input
                id="reg-username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-input-wrapper">
              <label htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-input-wrapper password-group">
              <label htmlFor="reg-password">Password</label>
              <div className="password-input-row">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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

            <div className="form-input-wrapper">
              <label htmlFor="reg-confirmpassword">Confirm Password</label>
              <input
                id="reg-confirmpassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-submit-cta" disabled={submitting}>
              {submitting ? "Registering..." : "Create Account"}
            </button>
          </form>

          <p className="auth-form-switcher">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
