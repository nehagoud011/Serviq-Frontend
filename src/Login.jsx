
import { useState } from "react";
import "./Register.css";

function Login({ onRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user);
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch {
      setMessage("Unable to connect. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-visual">
          <div className="visual-overlay" />

          <div className="brand">
            <div className="brand-mark">S</div>
            <span>serviq</span>
          </div>

          <div className="visual-content">
            <span className="eyebrow">SMART HOME CARE</span>
            <h1>
              Your home.
              <br />
              <span>Under control.</span>
            </h1>
            <p>
              One simple place to manage your appliances,
              service records, and home maintenance.
            </p>

            <div className="visual-features">
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>All your assets in one place</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Easy service tracking</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Smarter home maintenance</span>
              </div>
            </div>
          </div>

          <div className="visual-footer">
            <span>YOUR HOME, WELL MAINTAINED.</span>
            <span className="footer-dot" />
          </div>
        </aside>

        <section className="auth-form-panel">
          <div className="mobile-brand">
            <div className="brand-mark">S</div>
            <span>serviq</span>
          </div>

          <div className="auth-form-content">
            <span className="form-label">WELCOME BACK</span>
            <h2>Welcome back</h2>
            <p className="form-description">
              Log in to continue managing your home.
            </p>

            <form onSubmit={handleLogin} className="auth-form">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />

              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
                {!loading && <span aria-hidden="true">→</span>}
              </button>

              {message && (
                <p className="auth-message error" role="status">
                  {message}
                </p>
              )}
            </form>

            <p className="auth-switch">
              New to Serviq?
              <button
                type="button"
                className="text-button"
                onClick={onRegister}
              >
                Create an account
              </button>
            </p>

            <p className="auth-legal">
              Built for a smarter, better-maintained home.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Login;
