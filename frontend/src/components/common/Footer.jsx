import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import "../Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      showToast(`✉️ Thank you! ${email} has been subscribed to our newsletter!`, "success");
      setEmail("");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section brand-sec">
            <h3>🛍️ EcomCatalog</h3>
            <p>Curating high-quality products across multiple categories. Designed with high-performance frameworks and clean code principles.</p>
            <div className="social-links">
              <span className="social-icon">🔵</span>
              <span className="social-icon">🟣</span>
              <span className="social-icon">🔴</span>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Product Catalog</a></li>
              <li><a href="/login">User Login</a></li>
              <li><a href="/register">Create Account</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li>Electronics</li>
              <li>Clothing</li>
              <li>Home & Kitchen</li>
            </ul>
          </div>

          <div className="footer-section newsletter-sec">
            <h4>Stay Connected</h4>
            <p>Subscribe to receive discounts, product releases, and catalogue updates directly in your inbox.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EcomCatalog Inc. Engineered with state-of-the-art JSX, dynamic CSS variables, and JWT Security.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
