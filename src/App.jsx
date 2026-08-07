import './App.css'

const APP_STORE_URL = 'https://apps.apple.com/us/app/swolie-gym-workout-tracker/id6756705472'
const image = (name) => `${import.meta.env.BASE_URL}images/${name}`

const weekDays = [
  { day: 'S', date: '4', state: 'rest', label: 'Rest day' },
  { day: 'M', date: '5', state: 'done', label: 'Workout complete' },
  { day: 'T', date: '6', state: 'rest', label: 'Rest day' },
  { day: 'W', date: '7', state: 'today', label: 'Workout today' },
  { day: 'T', date: '8', state: 'planned', label: 'Workout planned' },
  { day: 'F', date: '9', state: 'rest', label: 'Rest day' },
  { day: 'S', date: '10', state: 'planned', label: 'Workout planned' },
]

const schedule = [
  { day: 'MON', date: '05', title: 'Upper body', meta: '6 exercises · 52 min', state: 'complete' },
  { day: 'TUE', date: '06', title: 'Rest day', meta: 'Recovery is part of the plan', state: 'rest' },
  { day: 'WED', date: '07', title: 'Lower body', meta: '5 exercises · ~48 min', state: 'today' },
  { day: 'THU', date: '08', title: 'Rest day', meta: 'Your schedule stays flexible', state: 'rest' },
]

const mascotMoments = [
  { src: 'swolie-ready.png', label: 'Workout day', alt: 'Swolie is ready to train' },
  { src: 'swolie-stretch.png', label: 'Warm-up', alt: 'Swolie stretches before a workout' },
  { src: 'swolie-hydrate.png', label: 'Recovery', alt: 'Swolie takes a hydration break' },
  { src: 'swolie-cheer.png', label: 'Big win', alt: 'Swolie celebrates a completed workout' },
  { src: 'swolie-trophy.png', label: 'Milestone', alt: 'Swolie holds a trophy for a milestone' },
]

function AppStoreBadge() {
  return (
    <a
      href={APP_STORE_URL}
      className="app-store-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Swolie on the App Store"
    >
      <img src={image('app-store-badge.svg')} alt="Download on the App Store" />
    </a>
  )
}

function App() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="site-backdrop" aria-hidden="true">
        <div className="backdrop-grid" />
        <div className="backdrop-glow backdrop-glow-one" />
        <div className="backdrop-glow backdrop-glow-two" />
      </div>

      <header className="nav-shell">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand-lockup" href="#top" aria-label="swolie home">
            <img src={image('appicon-light.png')} alt="" aria-hidden="true" />
            <span className="wordmark">swolie</span>
          </a>

          <div className="nav-links">
            <a href="#your-week">Your week</a>
            <a href="#features">Features</a>
            <a href="#meet-swolie">Meet Swolie</a>
          </div>

          <a
            href={APP_STORE_URL}
            className="button button-small"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get the app
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Your Virtual Gym Buddy</p>
            <h1>
              A tracker that feels like a <span>spotter.</span>
            </h1>
            <p className="hero-lede">
              Build a plan around your real week, log every set without slowing down,
              and let Swolie keep the next step obvious.
            </p>

            <div className="hero-actions">
              <AppStoreBadge />
              <a className="text-link" href="#features">
                See what it tracks <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="hero-notes" aria-label="Product availability">
              <span><i aria-hidden="true" /> Built for iPhone</span>
              <span><i aria-hidden="true" /> Apple Watch companion</span>
            </div>
          </div>

          <div className="hero-stage" aria-label="Preview of the Swolie app home screen">
            <div className="hero-stage-copy" aria-hidden="true">
              <span>small buddy.</span>
              <strong>big gains.</strong>
            </div>

            <div className="phone-shadow" aria-hidden="true" />
            <div className="phone-frame">
              <div className="phone-screen">
                <div className="phone-status" aria-hidden="true">
                  <span>9:41</span>
                  <span className="dynamic-island" />
                  <span>●●●</span>
                </div>

                <div className="phone-heading">
                  <span>Home</span>
                  <span className="settings-dot" aria-hidden="true">•</span>
                </div>

                <div className="week-card">
                  <div className="week-card-top">
                    <span>This Week</span>
                    <strong>3-day streak</strong>
                  </div>
                  <div className="week-row">
                    {weekDays.map((item, index) => (
                      <div className={`week-day ${item.state}`} key={`${item.day}-${index}`}>
                        <span aria-label={item.label}>{item.state === 'done' ? '✓' : item.day}</span>
                        <small>{item.date}</small>
                      </div>
                    ))}
                  </div>
                  <div className="week-stats">
                    <div><strong>44.0k <small>lbs</small></strong><span>last 3 months</span></div>
                    <div><strong>3</strong><span>workouts</span></div>
                    <div><strong className="amber">51</strong><span>sets</span></div>
                  </div>
                </div>

                <div className="phone-mascot">
                  <div className="mascot-glow" aria-hidden="true" />
                  <img src={image('swolie-ready.png')} alt="Swolie is ready for today's workout" />
                  <strong>Swolie</strong>
                  <span>“Let’s get after it!”</span>
                </div>

                <div className="start-workout"><span aria-hidden="true">▶</span> Start Workout</div>
              </div>
            </div>

            <div className="hero-buddy">
              <div className="speech-bubble">I’ve got your next set.</div>
              <img src={image('swolie-wave.png')} alt="Swolie waves hello" />
            </div>

            <div className="rest-chip">
              <img src={image('swolie-meditate.png')} alt="" aria-hidden="true" />
              <span><small>Tomorrow</small>Rest day</span>
            </div>
          </div>
        </section>

        <section className="signal-strip" aria-label="Swolie features">
          <div>
            <span>Guided programs</span><i />
            <span>Fast workout logging</span><i />
            <span>Rest-day scheduling</span><i />
            <span>Progress you can see</span><i />
            <span>Apple Watch ready</span>
          </div>
        </section>

        <section className="week-section section-shell" id="your-week">
          <div className="section-copy">
            <p className="section-kicker">TRAIN YOUR WAY</p>
            <h2>Your plan should fit your week. Not fight it.</h2>
            <p>
              Choose how often you train, pick the days that actually work, and Swolie
              maps the right routine to each one. Your rest days stay visible, intentional,
              and easy to change.
            </p>
            <ul className="check-list">
              <li>3-, 4-, and 6-day guided programs</li>
              <li>Flexible training when every week is different</li>
              <li>Independent weight and distance units</li>
            </ul>
          </div>

          <div className="schedule-stage">
            <div className="schedule-card">
              <div className="schedule-header">
                <div>
                  <span>YOUR PROGRAM</span>
                  <h3>Upper / Lower</h3>
                </div>
                <span className="week-pill">Week 3 of 8</span>
              </div>

              <div className="schedule-list">
                {schedule.map((item) => (
                  <div className={`schedule-row ${item.state}`} key={item.date}>
                    <div className="date-tile"><span>{item.day}</span><strong>{item.date}</strong></div>
                    <div className="schedule-detail"><strong>{item.title}</strong><span>{item.meta}</span></div>
                    <div className="schedule-status" aria-hidden="true">
                      {item.state === 'complete' ? '✓' : item.state === 'today' ? 'Start' : '—'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <img
              className="schedule-mascot"
              src={image('swolie-clipboard.png')}
              alt="Swolie holds the weekly training plan"
            />
          </div>
        </section>

        <section className="feature-section section-shell" id="features">
          <div className="section-heading">
            <div>
              <p className="section-kicker">EVERYTHING BETWEEN START AND STRONGER</p>
              <h2>Serious tracking.<br />Zero spreadsheet energy.</h2>
            </div>
            <p>
              The detail lifters want, organized so the next action is always the easiest one.
            </p>
          </div>

          <div className="bento-grid">
            <article className="feature-card feature-card-log">
              <div className="feature-number">01</div>
              <div className="feature-copy">
                <span className="feature-label">WORKOUTS</span>
                <h3>Log the set.<br />Keep the flow.</h3>
                <p>Weight, reps, notes, supersets, rest timers, and previous performance stay right where you need them.</p>
              </div>
              <div className="set-table" aria-label="Example workout log">
                <div className="set-table-head"><span>SET</span><span>LBS</span><span>REPS</span><span /></div>
                <div><span>1</span><strong>185</strong><strong>8</strong><i>✓</i></div>
                <div><span>2</span><strong>185</strong><strong>8</strong><i>✓</i></div>
                <div className="set-current"><span>3</span><strong>190</strong><strong>6</strong><i /></div>
              </div>
              <img src={image('swolie-lifting.png')} alt="Swolie lifts a barbell" />
            </article>

            <article className="feature-card feature-card-progress">
              <div className="feature-number">02</div>
              <span className="feature-label">PROGRESS</span>
              <h3>See strength climb.</h3>
              <p>Personal records, volume, streaks, and trends update as you train.</p>
              <div className="chart" aria-label="Example upward training volume chart">
                {[31, 44, 38, 57, 66, 84].map((height, index) => (
                  <span style={{ '--bar-height': `${height}%` }} key={index} />
                ))}
              </div>
              <div className="chart-footer"><span>12 weeks</span><strong>+18%</strong></div>
            </article>

            <article className="feature-card feature-card-watch">
              <div className="feature-number">03</div>
              <span className="feature-label">APPLE WATCH</span>
              <h3>Your workout, on your wrist.</h3>
              <p>Move through exercises and keep your phone out of the way.</p>
              <img src={image('swolie-watch.png')} alt="Swolie checks a workout on Apple Watch" />
            </article>

            <article className="feature-card feature-card-health">
              <div className="feature-number">04</div>
              <span className="feature-label">ACTIVITY</span>
              <h3>Lifting and cardio, together.</h3>
              <p>Bring supported Health workouts into the same activity history as your strength sessions.</p>
              <div className="run-stats" aria-label="Example run stats">
                <div><strong>3.1</strong><span>MILES</span></div>
                <div><strong>28:42</strong><span>TIME</span></div>
              </div>
              <img src={image('swolie-run.png')} alt="Swolie runs alongside imported cardio activity" />
            </article>

            <article className="feature-card feature-card-photos">
              <div className="feature-number">05</div>
              <span className="feature-label">PROGRESS PHOTOS</span>
              <h3>Make progress visible.</h3>
              <p>Capture consistent check-ins and compare changes without leaving the app.</p>
              <div className="photo-stack" aria-hidden="true"><span /><span /><span /></div>
              <img src={image('swolie-camera.png')} alt="Swolie takes a progress photo" />
            </article>

            <article className="feature-card feature-card-recovery">
              <div className="feature-number">06</div>
              <span className="feature-label">REST &amp; PROGRESSION</span>
              <h3>Push when it counts. Recover when it helps.</h3>
              <p>Set your default timer and choose whether Swolie suggests the next weight increase.</p>
              <div className="timer-pill"><span>REST TIMER</span><strong>1:24</strong></div>
              <img src={image('swolie-hydrate.png')} alt="Swolie hydrates during a rest period" />
            </article>
          </div>
        </section>

        <section className="mascot-section" id="meet-swolie">
          <div className="section-shell">
            <div className="mascot-heading">
              <div>
                <p className="section-kicker">A BUDDY THAT READS THE ROOM</p>
                <h2>Every moment.<br />One Swolie.</h2>
              </div>
              <p>
                Ready days, rest days, rough days, and record days all feel different.
                Swolie does too.
              </p>
            </div>

            <div className="mascot-grid">
              {mascotMoments.map((moment) => (
                <div className="mascot-card" key={moment.label}>
                  <span>{moment.label}</span>
                  <img src={image(moment.src)} alt={moment.alt} loading="lazy" />
                </div>
              ))}
            </div>

            <p className="mascot-quote">“Whatever today looks like, we’ll take the next step together.”</p>
          </div>
        </section>

        <section className="final-cta section-shell">
          <div className="cta-panel">
            <div className="cta-copy">
              <p className="section-kicker">READY WHEN YOU ARE</p>
              <h2>Your next set<br />starts here.</h2>
              <p>Build your week, meet your gym buddy, and make every workout count.</p>
              <AppStoreBadge />
            </div>
            <div className="cta-art">
              <div className="cta-ring" aria-hidden="true" />
              <img src={image('swolie-superhero.png')} alt="Swolie stands confidently in a superhero cape" loading="lazy" />
              <span className="wordmark">swolie</span>
            </div>
          </div>
        </section>

        <section className="support section-shell" aria-labelledby="support-title">
          <div>
            <p className="section-kicker">NEED A SPOT?</p>
            <h2 id="support-title">We’re here to help.</h2>
          </div>
          <a href="mailto:support@swolie.com">support@swolie.com <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell footer-main">
          <a className="brand-lockup" href="#top" aria-label="Back to the top">
            <img src={image('appicon-light.png')} alt="" aria-hidden="true" />
            <span className="wordmark">swolie</span>
          </a>
          <p>Your Virtual Gym Buddy</p>
          <div className="footer-links">
            <a href="/privacy/index.html">Privacy</a>
            <a href="/terms/index.html">Terms</a>
            <a href="mailto:support@swolie.com">Support</a>
          </div>
        </div>
        <div className="section-shell footer-bottom">
          <span>© {new Date().getFullYear()} swolie</span>
          <span>Made for the next set.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
