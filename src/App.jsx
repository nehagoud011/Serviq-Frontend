
import { useState } from 'react';


import './App.css';
import Assets from './Assets';
import ServiceHistory from './ServiceHistory';
import UserProfile from './UserProfile';
import Register from './Register';
import Login from './Login';

function App() {
  const [currentPage, setCurrentPage] = useState('register');
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Registration page
  if (currentPage === 'register') {
    return (
      <Register
        onLogin={() => setCurrentPage('login')}
      />
    );
  }

  // Login page
  if (currentPage === 'login') {
    return (
      <Login
        onLogin={(user) => {
          setLoggedInUser(user);
          setCurrentPage('home');
        }}
        onRegister={() => setCurrentPage('register')}
      />
    );
  }

  // Logout
  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentPage('login');
  };

  // Other pages
  if (currentPage !== 'home') {
    const pages = {
      assets: <Assets />,
      history: <ServiceHistory />,
      profile: <UserProfile />,
    };

    return (
      <div className="app">
        <nav className="navbar">
          <a
            className="logo"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
            }}
          >
            Serviq<span>.</span>
          </a>

          <button
            className="nav-button"
            onClick={() => setCurrentPage('home')}
          >
            ← Back to Home
          </button>
        </nav>

        {pages[currentPage] || null}
      </div>
    );
  }

  // Serviq homepage
  return (
    <div className="app">
      <nav className="navbar">
        <a
          className="logo"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
          }}
        >
          Serviq<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#features">Features</a>

          <button
            className="nav-button"
            onClick={() => setCurrentPage('assets')}
          >
            My Assets
          </button>

          <button
            className="nav-button"
            onClick={() => setCurrentPage('history')}
          >
            Service History
          </button>

          <button
            className="nav-button"
            onClick={() => setCurrentPage('profile')}
          >
            My Profile
          </button>

          <button
            className="nav-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <button
          className="nav-button"
          onClick={() => setCurrentPage('assets')}
        >
          Get Started
        </button>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">
              SMART MAINTENANCE. SIMPLIFIED.
            </p>

            <h1>
              Everything you own,
              <br />
              <span>cared for in one place.</span>
            </h1>

            <p className="hero-description">
              Manage your vehicles and home appliances, track repairs,
              monitor warranties, and stay ahead of maintenance with Serviq.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => setCurrentPage('assets')}
              >
                Explore Serviq →
              </button>

              <a
                className="secondary-button"
                href="#features"
              >
                Discover Features
              </a>
            </div>

            <div className="trust-note">
              <span className="status-dot"></span>
              Your everyday maintenance companion
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-orbit orbit-one"></div>
            <div className="visual-orbit orbit-two"></div>

            <div className="main-visual-card">
              <div className="visual-card-top">
                <span className="visual-icon">⌂</span>
                <span className="mini-label">YOUR ASSETS</span>
              </div>

              <h2>All in one place.</h2>
              <p>Keep your essentials running smoothly.</p>

              <div className="asset-row">
                <span className="asset-icon">🚗</span>
                <div>
                  <strong>Car &amp; Bike</strong>
                  <small>Service tracking</small>
                </div>
                <span className="asset-arrow">↗</span>
              </div>

              <div className="asset-row">
                <span className="asset-icon">❄️</span>
                <div>
                  <strong>Home appliances</strong>
                  <small>Care &amp; warranty</small>
                </div>
                <span className="asset-arrow">↗</span>
              </div>

              <div className="asset-row">
                <span className="asset-icon">🧠</span>
                <div>
                  <strong>Smart predictions</strong>
                  <small>Plan maintenance ahead</small>
                </div>
                <span className="asset-arrow">↗</span>
              </div>
            </div>

          </div>
        </section>

        <section className="services-section" id="services">
          <p className="eyebrow">
            ONE PLATFORM, MANY POSSIBILITIES
          </p>

          <h2>Care for everything that matters.</h2>

          <p className="section-description">
            Keep track of your everyday essentials without the hassle.
          </p>

          <div className="service-grid">
            <article className="service-card">
              <span className="service-emoji">🚘</span>
              <h3>Vehicles</h3>
              <p>
                Manage cars, bikes, servicing, and repair records.
              </p>
            </article>

            <article className="service-card">
              <span className="service-emoji">🏠</span>
              <h3>Home Appliances</h3>
              <p>
                Organize appliance details, warranties, and service history.
              </p>
            </article>

            <article className="service-card">
              <span className="service-emoji">🤖</span>
              <h3>AI Maintenance</h3>
              <p>
                Explore maintenance estimates and upcoming service needs.
              </p>
            </article>
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button
              className="primary-button"
              onClick={() => setCurrentPage('assets')}
            >
              Manage My Assets →
            </button>

            <button
              className="primary-button"
              style={{ marginLeft: '12px' }}
              onClick={() => setCurrentPage('history')}
            >
              View Service History →
            </button>

            <button
              className="primary-button"
              style={{ marginLeft: '12px' }}
              onClick={() => setCurrentPage('profile')}
            >
              My Profile →
            </button>
          </div>
        </section>

        <section className="features-section" id="features">
          <div>
            <p className="eyebrow">
              LESS GUESSWORK, MORE CONTROL
            </p>

            <h2>Your maintenance journey, organized.</h2>
          </div>

          <div className="feature-list">
            <p>✓ Service and repair history</p>
            <p>✓ Warranty and maintenance tracking</p>
            <p>✓ Maintenance cost overview</p>
            <p>✓ Upcoming service planning</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a
          className="logo"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
          }}
        >
          Serviq<span>.</span>
        </a>

        <p>Smarter care for your everyday essentials.</p>
      </footer>
    </div>
  );
}

export default App;
