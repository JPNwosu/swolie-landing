import './App.css'

function App() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero">
        <img
          src={`${import.meta.env.BASE_URL}images/swolie-proud.png`}
          alt="Swolie mascot"
          className="hero-image"
        />
        <h1 className="title">Swolie</h1>
        <p className="tagline">Your Virtual Workout Buddy</p>
        <p className="description">
          Track your workouts, build streaks, and stay motivated with Swolie —
          a fitness companion that celebrates your consistency and keeps you on track.
        </p>

        {/* App Store Badge */}
        <div className="app-store-badge">
          <svg viewBox="0 0 24 24" className="apple-icon" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <div className="badge-text">
            <span className="badge-subtitle">Coming Soon on the</span>
            <span className="badge-title">App Store</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <h3>Build Streaks</h3>
          <p>Stay consistent with daily workout streaks that keep you motivated</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20V10M18 20V4M6 20v-4"/>
            </svg>
          </div>
          <h3>Track Progress</h3>
          <p>See your fitness journey with beautiful charts and insights</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
          </div>
          <h3>Stay Motivated</h3>
          <p>Swolie celebrates every win and cheers you on</p>
        </div>
      </section>

      {/* Support Section */}
      <section className="support">
        <h2>Need Help?</h2>
        <p>
          Have questions, feedback, or need support? We'd love to hear from you.
        </p>
        <a href="mailto:support@swolie.com" className="support-link">
          support@swolie.com
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <span className="footer-divider">|</span>
          <a href="/terms">Terms of Service</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Swolie. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
