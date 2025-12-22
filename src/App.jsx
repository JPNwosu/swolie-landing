import './App.css'

function App() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero">
        <img
          src="/images/swolie-proud.png"
          alt="Swolie mascot"
          className="hero-image"
        />
        <h1 className="title">Swolie</h1>
        <p className="tagline">Your Virtual Workout Buddy</p>
        <p className="description">
          Track your workouts, build streaks, and stay motivated with Swolie —
          a fitness companion that celebrates your consistency and keeps you on track.
        </p>
        <a
          href="#"
          className="app-store-button"
          onClick={(e) => e.preventDefault()}
        >
          Coming Soon to App Store
        </a>
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
        <p>&copy; {new Date().getFullYear()} Swolie. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
