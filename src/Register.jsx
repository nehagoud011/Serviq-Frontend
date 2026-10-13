import { useState } from "react";
import { API_BASE_URL } from "./services/apiConfig";
import "./Register.css";

function Register({ onLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!agreed) {
      setMessage("Please agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`.trim(),
            email,
            password,
            address,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully. Please log in.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setAddress("");
        setPassword("");
        setConfirmPassword("");
        setAgreed(false);
      } else {
        setMessage(data.message || "Registration failed. Please try again.");
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
            <div className="brand-mark">⌂</div>
            <span>Serviq</span>
          </div>

          <div className="visual-content">
            <h1>
              Let’s Keep Your
              <br />
              Home Running
              <br />
              <span>Smoothly</span>
            </h1>

            <div className="gold-divider" />

            <p>
              Reliable care for every appliance
              <br />
              in your home.
            </p>

            <div className="visual-features">
              <div className="feature-item">
                <span className="feature-icon">♧</span>
                <span>Trusted<br />Technicians</span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">⚙</span>
                <span>Fast & Reliable<br />Service</span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">⌂</span>
                <span>All Home<br />Appliances</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="auth-form-panel">
          <div className="auth-form-content">
            <div className="gold-divider form-divider" />

            <h2>Create an Account</h2>
            <p className="form-description">
              Join Serviq and take the first step towards a
              well-maintained home.
            </p>

            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    id="first-name"
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    id="last-name"
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="register-email">Email</label>
                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="register-address">Address</label>
                <input
                  id="register-address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="register-password">Create Password</label>
                  <input
                    id="register-password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    autoComplete="new-password"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <label className="terms-row">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <span>
                  I agree to the <strong>Terms & Conditions</strong> and{" "}
                  <strong>Privacy Policy</strong>
                </span>
              </label>

              <button type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
                {!loading && <span aria-hidden="true">→</span>}
              </button>

              {message && (
                <p
                  className={`auth-message ${
                    message.includes("successfully") ? "success" : "error"
                  }`}
                  role="status"
                >
                  {message}
                </p>
              )}
            </form>

            <p className="auth-switch">
              Already have an account?
              <button
                type="button"
                className="text-button"
                onClick={onLogin}
              >
                Sign in
              </button>
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Register;