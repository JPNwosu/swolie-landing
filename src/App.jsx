import './App.css'

function App() {
  return (
    <div className="page">
      {/* Background Effects */}
      <div className="bg-gradient" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="noise-overlay" />

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-brand">
          <img
            src={`${import.meta.env.BASE_URL}images/swolie-proud.png`}
            alt="Swolie"
            className="nav-logo"
          />
          <span className="nav-name">Swolie</span>
        </div>
        <a
          href="https://apps.apple.com/us/app/swolie-gym-workout-tracker/id6756705472"
          className="nav-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-brand">Swolie</span>
            Your Virtual <span className="title-accent">Gym Buddy</span>
          </h1>
          <p className="hero-subtitle">
            Track every rep, build streaks, and stay motivated with Swolie.
            Your personal gym partner that celebrates your wins.
          </p>
          <div className="hero-actions">
            <a
              href="https://apps.apple.com/us/app/swolie-gym-workout-tracker/id6756705472"
              className="app-store-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/app-store-badge.svg`}
                alt="Download on the App Store"
                className="app-store-img"
              />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="phone-glow" />
          <div className="phone-container">
            <img
              src={`${import.meta.env.BASE_URL}images/swolie-landing-home.png`}
              alt="Swolie app interface"
              className="phone-mockup"
            />
            <img
              src={`${import.meta.env.BASE_URL}images/swolie-proud.png`}
              alt="Swolie mascot"
              className="floating-mascot"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <h2 className="section-title">Build Streaks. Build Muscle.</h2>
          <p className="section-subtitle">Simple, powerful tools to crush your fitness goals</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Track Every Rep</h3>
            <p>Log your workouts with an intuitive interface designed for the gym floor</p>
          </div>

          <div className="feature-card">
            <h3>Build Your Routine</h3>
            <p>Create custom workout templates or choose from pre-built routines</p>
          </div>

          <div className="feature-card">
            <h3>Stay Accountable</h3>
            <p>Swolie celebrates every win and keeps you coming back for more</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Swolie?</h2>
          <p>Join thousands crushing their fitness goals with their new favorite gym buddy.</p>
          <a
            href="https://apps.apple.com/us/app/swolie-gym-workout-tracker/id6756705472"
            className="app-store-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/app-store-badge.svg`}
              alt="Download on the App Store"
              className="app-store-img"
            />
          </a>
        </div>
      </section>

      {/* Support Section */}
      <section className="support">
        <h3>Need Help?</h3>
        <p>Questions, feedback, or just want to say hi? We'd love to hear from you.</p>
        <a href="mailto:support@swolie.com" className="support-link">
          support@swolie.com
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img
              src={`${import.meta.env.BASE_URL}images/swolie-proud.png`}
              alt="Swolie"
              className="footer-logo"
            />
            <span>Swolie</span>
          </div>
          <div className="footer-links">
            <a href="/privacy/index.html">Privacy Policy</a>
            <a href="/terms/index.html">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Swolie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
