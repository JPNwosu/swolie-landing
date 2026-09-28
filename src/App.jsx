import { useEffect, useRef, useState } from 'react'
import './App.css'

const APP_STORE_URL = 'https://apps.apple.com/us/app/swolie-gym-workout-tracker/id6756705472'
const base = import.meta.env.BASE_URL
const pose = (name) => `${base}poses/swolie-${name}.webp`
const shot = (name) => `${base}shots/${name}.webp`
const media = (name) => `${base}media/${name}`

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------------------------------------------------------------------------
// Scroll plumbing: one rAF loop writes --p (0..1) onto every [data-scroll]
// element so CSS can drive the scroll animations without React re-renders.
//   data-scroll="through" -> 0 when the element enters, 1 when it leaves
//   data-scroll="sticky"  -> 0 at the top of a tall section, 1 at its end
// ---------------------------------------------------------------------------
function useScrollVars() {
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      document.querySelectorAll('[data-scroll]').forEach((el) => {
        const r = el.getBoundingClientRect()
        const p = el.dataset.scroll === 'sticky'
          ? -r.top / Math.max(1, r.height - vh)
          : (vh - r.top) / (vh + r.height)
        el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4))
      })
      document.documentElement.classList.toggle('scrolled', window.scrollY > 40)
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      cancelAnimationFrame(frame)
    }
  }, [])
}

// Adds .in to [data-reveal] elements the first time they enter the viewport
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (reducedMotion()) { els.forEach((el) => el.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Muted looping clip that only plays while on screen
function Clip({ src, poster, label, className = '', videoRef, managed = false }) {
  const local = useRef(null)
  const ref = videoRef ?? local
  useEffect(() => {
    const v = ref.current
    if (!v || managed) return
    if (reducedMotion()) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [ref, managed])
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}

function Phone({ clip, poster, label, className = '', style, managed = false }) {
  return (
    <div className={`phone ${className}`} style={style}>
      <div className="phone-screen">
        {clip
          ? <Clip src={clip} poster={poster} label={label} managed={managed} />
          : <img src={poster} alt={label} loading="lazy" />}
      </div>
    </div>
  )
}

function Sticker({ name, alt = '', className = '', style }) {
  return <img className={`sticker ${className}`} src={pose(name)} alt={alt} style={style} loading="lazy" draggable="false" />
}

// Die-cut mascot: white sticker edge, optionally sitting on an ink-stroked starburst
function DieCut({ name, alt = '', burst = 'sun', points = 14, className = '', style }) {
  return (
    <div className={`diecut ${className}`} style={style}>
      {burst && <Burst points={points} inner={0.8} className={`diecut-burst b-${burst}`} />}
      <img src={pose(name)} alt={alt} loading="lazy" draggable="false" />
    </div>
  )
}

const Icon = {
  play: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>,
  arrow: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  soundOff: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" /><path d="m16 9.5 5 5m0-5-5 5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>,
  soundOn: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" /><path d="M16 9a4.5 4.5 0 0 1 0 6m2.8-8.8a8.5 8.5 0 0 1 0 11.6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>,
}

// Push-sticker button: fill + ink edge + hard drop that shrinks when pressed
function PushButton({ as = 'a', variant = 'primary', icon = 'arrow', size = '', children, className = '', ...rest }) {
  const Tag = as
  return (
    <Tag className={`btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`} {...rest}>
      <span className="btn-badge">{Icon[icon]}</span>
      <span className="btn-text">{children}</span>
    </Tag>
  )
}

function Burst({ points = 16, inner = 0.74, className = '', style }) {
  const pts = []
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 100 : 100 * inner
    const a = (Math.PI * i) / points - Math.PI / 2
    pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`)
  }
  return (
    <svg className={`burst ${className}`} style={style} viewBox="-100 -100 200 200" aria-hidden="true">
      <polygon points={pts.join(' ')} />
    </svg>
  )
}

function AppStoreBadge({ className = '' }) {
  return (
    <a href={APP_STORE_URL} className={`store-badge ${className}`} target="_blank" rel="noopener noreferrer"
      aria-label="Download swolie on the App Store">
      <img src={`${base}images/app-store-badge.svg`} alt="Download on the App Store" />
    </a>
  )
}

// ---------------------------------------------------------------------------

const MARQUEE_A = ['log sets in one tap', 'plans that fit your week', 'weekly wrapped recaps', 'apple watch', 'live activities', 'streak widgets']
const MARQUEE_B = ['level up', 'new PR', 'rest timer', 'muscle map', 'progress photos', 'cardio from health']
const MARQUEE_POSES = ['wave', 'lifting', 'cheer', 'pr', 'streak', 'trophy']

const CHAPTERS = [
  {
    id: 'plan', theme: 'sun', eyebrow: 'Your plan', title: ['Always know', "what's next."],
    copy: 'Pick your days and swolie builds the week around them. Open the app and today\'s workout is already waiting, with every exercise, set and rep laid out.',
    points: ['3, 4 and 6-day plans, or train flexibly', 'Rest days that stay rest days', 'Swap a workout when life happens'],
    clip: 'app-plan', sticker: 'clipboard', callouts: ['today-plan', 'today-list'],
  },
  {
    id: 'log', theme: 'ink', eyebrow: 'Logging', title: ['Log a set.', 'One tap.'],
    copy: 'Last session\'s numbers are already filled in. Tap the check, the rest timer starts itself, and swolie tells you when you\'ve earned a heavier weight.',
    points: ['Automatic rest timer', 'Level Up nudges when you hit your reps', 'Instant PR celebrations'],
    clip: 'app-log', sticker: 'lifting', callouts: ['levelup', 'rest-timer'],
  },
  {
    id: 'recaps', theme: 'cream', eyebrow: 'Recaps', title: ['Your week,', 'Wrapped.'],
    copy: 'Every week, month and year turns into a story you actually want to post. Big numbers, funny comparisons, zero spreadsheets.',
    points: ['Weekly, monthly and yearly stories', 'Made to share on Instagram', 'Never shows your exact weights'],
    clip: 'app-recap', sticker: 'cheer', callouts: [],
  },
  {
    id: 'gains', theme: 'coral', eyebrow: 'Progress', title: ['Watch the', 'gains stack.'],
    copy: 'Plan progress, personal records, top gainers and week-by-week volume. See exactly how far you\'ve come since week one.',
    points: ['PRs and top gainers', 'Volume by week, best week crowned', 'Strength trends for every lift'],
    clip: 'app-gains', sticker: 'trophy', callouts: ['exercise-progress'],
  },
]

const EXTRAS = [
  { pose: 'camera', title: 'Progress photos', copy: 'Consistent check-ins with side-by-side compares.' },
  { pose: 'run', title: 'Cardio from Health', copy: 'Runs and rides land next to your lifts.' },
  { pose: 'timer', title: 'Smart rest timer', copy: 'Starts on its own. ±15s when you need it.' },
  { pose: 'overhead-press', title: 'Auto progression', copy: 'Hit your reps, get a nudge to go heavier.' },
  { pose: 'streak', title: 'Streaks & widgets', copy: 'A year of effort, one glance at your Home Screen.' },
  { pose: 'open-book', title: '900+ exercises', copy: 'Demos and muscle maps for every one, plus your own custom exercises.' },
]

// A hand-picked sample of swolie's poses (the full set keeps growing)
const POSES = [
  'wave', 'double-flex', 'lifting', 'cheer', 'pr', 'trophy', 'streak', 'superhero',
  'victory-dance', 'meditate', 'hydrate', 'run', 'swim', 'deadlift', 'bench-press', 'pullup',
  'kettlebell', 'plank', 'stretch', 'cozy-rest', 'night-owl', 'early-bird', 'game-face', 'fist-bump',
  'megaphone', 'mind-blown', 'think', 'camera', 'graduate', 'birthday', 'comeback', 'sad-rain',
]

// Real App Store reviews, quoted verbatim (5★ written reviews as of Sep 28, 2026).
// Ratings summary is a snapshot: refresh with `asc reviews ratings --app 6756705472 --all`.
const RATING = { average: 4.9 }
const REVIEWS = [
  { title: 'Delete your current workout app!', body: 'This app is by far the best workout tracker/planner I have ever seen. I can’t believe it’s 100% completely free!', name: 'Bensenmy', where: 'Canada', pose: 'trophy' },
  { title: 'Great gym tracker!', body: 'I never leave reviews but this is Great app here, does most things and does them very well, excited for future development! Greatly appreciate the lack of accounts, pricing, and ads, really just you and the gains. Thank you for such a great Gym app!', name: 'chaserayden', where: 'United States', pose: 'lifting' },
  { title: 'Great workout app', body: 'The app is great. I actually only tried it because of the swolie character. He’s pretty cool. 😎', name: 'Mr MJ123', where: 'Australia', pose: 'wave' },
  { title: 'Great start!!!!', body: 'I randomly came to Swolie and I’m amazed about how much fun and simple tracking a workout can be. I’m lost with the bells and whistles of most of the other similar apps.', name: 'mactanzi76', where: 'Costa Rica', pose: 'cheer' },
  { title: 'Rare Find', body: 'Crazy that a workout app of such high quality is completely free. Such a refreshing thing to see!', name: 'SideQurst', where: 'United States', pose: 'magnify' },
  { title: 'Phenomenal', body: 'Everything the paid apps has but for FREEEEEEE', name: 'Ch0ppaDawg', where: 'Canada', pose: 'double-flex' },
  { title: 'Amazing App!!!', body: 'This is the best app I’ve ever used to track my workouts and it’s free!!', name: 'Sugarplumdelite', where: 'United States', pose: 'pr' },
  { title: 'IT’S FREE', body: 'Awesome Tracker. Would pay for this.', name: 'oikjhb', where: 'Canada', pose: 'fist-bump' },
]

const RECAP_REEL = ['10-recap-1', '11-recap-2', '12-recap-3', '13-recap-4']

// ---------------------------------------------------------------------------

function Nav() {
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Primary">
        <a className="brand" href="#top" aria-label="swolie home">
          <img src={`${base}images/appicon-light.png`} alt="" />
          <span>swolie</span>
        </a>
        <div className="nav-links">
          <a href="#film">The film</a>
          <a href="#features">Features</a>
          <a href="#everywhere">Watch</a>
          <a href="#moods">Meet swolie</a>
        </div>
        <PushButton className="nav-cta" size="sm" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">Get the app</PushButton>
      </nav>
    </header>
  )
}

function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
    }
    el.addEventListener('pointermove', move)
    return () => el.removeEventListener('pointermove', move)
  }, [])

  return (
    <section className="hero" id="top" ref={ref} data-scroll="through">
      <Burst points={18} inner={0.78} className="hero-burst" />
      <div className="hero-grid shell">
        <div className="hero-copy">
          <p className="pill-label hero-label"><span className="dot" /> Now on the App Store</p>
          <h1 className="display">
            <span className="line">Meet your</span>
            <span className="line">gym buddy<span className="accent">.</span></span>
          </h1>
          <p className="lede">
            swolie plans your week, logs every set in a tap, and turns your progress into stories
            worth sharing. Basically a spotter that lives in your pocket.
          </p>
          <div className="hero-actions">
            <AppStoreBadge />
            <PushButton variant="secondary" icon="play" href="#film">Watch the 29-second pitch</PushButton>
          </div>
          <p className="hero-meta">For iPhone and Apple Watch</p>
        </div>

        <div className="hero-art" aria-label="swolie app preview">
          <Phone className="hero-phone" clip={media('app-plan.mp4')} poster={media('app-plan.webp')}
            label="swolie app: moving from Home to today's workout" />
          <DieCut name="double-flex" alt="swolie flexing" burst="lime" className="hero-mascot" points={16} />
          <div className="float-chip chip-streak"><img src={pose('streak')} alt="" className="chip-pose" /> 13-day streak</div>
          <div className="float-chip chip-pr">New PR <b>+5 lb</b></div>
          <div className="float-chip chip-level">Level up ↑</div>
        </div>
      </div>
      <a className="scroll-cue" href="#film" aria-label="Scroll down">
        <Sticker name="looking" />
      </a>
    </section>
  )
}

function Marquee() {
  const row = (words, dir) => (
    <div className={`marquee ${dir}`} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div className="marquee-set" key={k}>
            {words.map((w, i) => (
              <span className="marquee-item" key={w}>
                {w}
                <img src={pose(MARQUEE_POSES[i % MARQUEE_POSES.length])} alt="" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <section className="marquees" aria-label="What swolie does">
      <p className="sr-only">{[...MARQUEE_A, ...MARQUEE_B].join(', ')}</p>
      {row(MARQUEE_A, 'left')}
      {row(MARQUEE_B, 'right')}
    </section>
  )
}

function Film() {
  const video = useRef(null)
  const [muted, setMuted] = useState(true)
  const toggle = () => {
    const v = video.current
    if (!v) return
    v.muted = !v.muted
    if (!v.muted) { v.currentTime = 0; v.play().catch(() => {}) }
    setMuted(v.muted)
  }
  return (
    <section className="film" id="film" data-scroll="sticky">
      <div className="film-sticky">
        <div className="film-heading">
          <p className="pill-label">The film</p>
          <h2 className="display">29 seconds of <span className="accent">swole.</span></h2>
        </div>
        <div className="film-stage">
          <Sticker name="superhero" className="film-s film-s1" />
          <Sticker name="megaphone" className="film-s film-s2" />
          <Sticker name="victory-dance" className="film-s film-s3" />
          <Sticker name="fist-bump" className="film-s film-s4" />
          <div className="film-card">
            <Clip videoRef={video} src={media('launch.mp4')} poster={media('launch.webp')} label="swolie launch film" />
            <PushButton as="button" type="button" variant={muted ? 'secondary' : 'lime'} size="sm" icon={muted ? 'soundOff' : 'soundOn'}
              className="sound-btn" onClick={toggle} aria-pressed={!muted}>
              {muted ? 'Tap for sound' : 'Sound on'}
            </PushButton>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const [active, setActive] = useState(0)
  const refs = useRef([])
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.index)) })
    }, { rootMargin: '-45% 0px -45% 0px' })
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])
  const ch = CHAPTERS[active]

  // Stage phones are stacked, so play only the active chapter's clip
  useEffect(() => {
    if (reducedMotion()) return
    document.querySelectorAll('.stage-layer video').forEach((v, i) => {
      if (i === active) v.play().catch(() => {})
      else v.pause()
    })
  }, [active])

  return (
    <section className={`features theme-${ch.theme}`} id="features">
      <div className="shell features-grid">
        <div className="chapters">
          {CHAPTERS.map((c, i) => (
            <article className={`chapter m-${c.theme} ${i === active ? 'is-active' : ''}`} key={c.id} data-index={i}
              ref={(el) => { refs.current[i] = el }}>
              <p className="pill-label">{c.eyebrow}</p>
              <h2 className="display">{c.title[0]}<br />{c.title[1]}</h2>
              <p className="chapter-copy">{c.copy}</p>
              <ul className="ticks">{c.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <div className="chapter-mobile-art">
                <Phone clip={media(`${c.clip}.mp4`)} poster={media(`${c.clip}.webp`)} label={`${c.eyebrow} in the swolie app`} />
                <DieCut name={c.sticker} burst={i % 2 ? 'lime' : 'sun'} className="chapter-mobile-sticker" />
              </div>
            </article>
          ))}
        </div>

        <div className="stage" aria-hidden="true">
          <div className="stage-inner">
            <Burst points={20} inner={0.8} className="stage-burst" />
            {CHAPTERS.map((c, i) => (
              <div className={`stage-layer ${i === active ? 'is-active' : ''}`} key={c.id}>
                <Phone className="stage-phone" clip={media(`${c.clip}.mp4`)} poster={media(`${c.clip}.webp`)} label="" managed />
                {c.callouts.map((name, k) => (
                  <div className={`callout callout-${c.id}-${k}`} key={name}><img src={shot(name)} alt="" /></div>
                ))}
                {c.id === 'gains' && <div className="big-number">+18%</div>}
                {c.id === 'recaps' && (
                  <>
                    <img className="recap-fan fan-l" src={shot('11-recap-2')} alt="" />
                    <img className="recap-fan fan-r" src={shot('13-recap-4')} alt="" />
                  </>
                )}
                <DieCut name={c.sticker} burst={i % 2 ? 'lime' : 'sun'} className={`stage-sticker sticker-${c.id}`} />
              </div>
            ))}
            <div className="chapter-dots">
              {CHAPTERS.map((c, i) => <span key={c.id} className={i === active ? 'on' : ''} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Everywhere() {
  return (
    <section className="everywhere" id="everywhere">
      <div className="shell">
        <div className="section-head" data-reveal>
          <p className="pill-label">Everywhere</p>
          <h2 className="display">Lock Screen. Wrist.<br />Home Screen. <span className="accent">Done.</span></h2>
          <p className="section-copy">Log sets and skip rest from the Lock Screen, follow along on Apple Watch,
            and watch your year fill in right on your Home Screen.</p>
        </div>
        <div className="ew-stage">
          <figure className="ew-live" data-reveal>
            <img src={shot('live-activity')} alt="swolie Live Activity on the Lock Screen with rest timer and next set" loading="lazy" />
            <figcaption>Live Activity</figcaption>
          </figure>
          <figure className="ew-watch" data-reveal>
            <div className="watch">
              <div className="watch-band top" />
              <div className="watch-band bottom" />
              <div className="watch-case">
                <div className="watch-screen">
                  <img src={shot('07-watch')} alt="swolie on Apple Watch showing Hack Squat sets" loading="lazy" />
                  <span className="watch-time">9:41</span>
                </div>
                <i className="watch-crown" /><i className="watch-action" />
              </div>
            </div>
            <figcaption>Apple Watch</figcaption>
          </figure>
          <figure className="ew-widget" data-reveal>
            <img src={shot('widget')} alt="swolie Home Screen widget showing the last 7 days of workouts" loading="lazy" />
            <figcaption>Widgets</figcaption>
          </figure>
          <DieCut name="watch" burst="lime" className="ew-sticker" />
        </div>
      </div>
    </section>
  )
}

function MuscleMap() {
  return (
    <section className="muscles" data-scroll="through">
      <div className="shell muscles-grid">
        <div className="muscle-art" data-reveal>
          <Burst points={22} inner={0.84} className="heat-burst" />
          <div className="callout muscle-figures"><img src={shot('muscle-figures')} alt="Front and back muscle heat map" loading="lazy" /></div>
          <DieCut name="magnify" burst="sun" className="muscle-sticker" />
        </div>
        <div className="muscle-copy" data-reveal>
          <p className="pill-label">Muscle map</p>
          <h2 className="display">See every<br />muscle<br />you hit<span className="accent">.</span></h2>
          <p className="section-copy">Hot spots glow. Blind spots don't hide. Every set counts toward the muscles it
            targets directly and the ones that help out.</p>
          <div className="callout muscle-bars"><img src={shot('muscle-bars')} alt="Sets by muscle group" loading="lazy" /></div>
        </div>
      </div>
    </section>
  )
}

function Extras() {
  return (
    <section className="extras">
      <div className="shell">
        <div className="section-head" data-reveal>
          <p className="pill-label">Also in the gym bag</p>
          <h2 className="display">The little things<span className="accent">.</span></h2>
        </div>
        <div className="extras-grid">
          {EXTRAS.map((x, i) => (
            <article className="extra" key={x.title} data-reveal style={{ '--i': i }}>
              <DieCut name={x.pose} points={12} className="extra-pose" />
              <h3>{x.title}</h3>
              <p>{x.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function RecapReel() {
  const items = [...RECAP_REEL, ...RECAP_REEL, ...RECAP_REEL]
  return (
    <section className="reel-section" data-scroll="through">
      <div className="shell reel-head" data-reveal>
        <p className="pill-label">Recaps</p>
        <h2 className="display">Stories worth<br />posting<span className="accent">.</span></h2>
      </div>
      <div className="reel" aria-label="Example swolie recap stories">
        <div className="reel-track">
          {items.map((s, i) => (
            <img key={i} className="reel-card" src={shot(s)} alt={i < RECAP_REEL.length ? 'swolie recap story' : ''}
              aria-hidden={i >= RECAP_REEL.length} loading="lazy" style={{ '--r': `${(i % 2 ? 1 : -1) * (2 + (i % 3))}deg` }} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Moods() {
  const [picked, setPicked] = useState(null)
  return (
    <section className="moods" id="moods">
      <div className="shell">
        <div className="section-head center" data-reveal>
          <p className="pill-label">Meet swolie</p>
          <h2 className="display">One buddy.<br /><span className="accent">Every</span> mood.</h2>
          <p className="section-copy">Ready days, rest days, rough days and record days. swolie shows up for all of
            them, and there are always new ones on the way. Tap one to say hi.</p>
        </div>
        <div className="mood-wall" data-reveal>
          {POSES.map((p, i) => (
            <button type="button" key={p} className={`mood ${picked === p ? 'picked' : ''}`}
              style={{ '--i': i, '--r': `${((i * 37) % 17) - 8}deg` }}
              onClick={() => setPicked(p === picked ? null : p)}
              aria-label={`swolie ${p.replace(/-/g, ' ')}`}>
              <img src={pose(p)} alt="" loading="lazy" draggable="false" />
              <span className="mood-name">{p.replace(/-/g, ' ')}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stars({ className = '' }) {
  return (
    <span className={`stars ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24"><path d="M12 2.6l2.9 6.1 6.7.8-4.9 4.6 1.3 6.6L12 17.4l-6 3.3 1.3-6.6-4.9-4.6 6.7-.8z" /></svg>
      ))}
    </span>
  )
}

function Reviews() {
  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="shell">
        <div className="section-head center" data-reveal>
          <p className="pill-label">Real App Store reviews</p>
          <h2 className="display" id="reviews-title">People love<br />their <span className="accent">buddy</span>.</h2>
          <a className="rating-badge" href={APP_STORE_URL} target="_blank" rel="noreferrer">
            <strong>{RATING.average.toFixed(1)}</strong>
            <Stars />
            <span>on the App Store</span>
          </a>
        </div>
        <div className="review-wall">
          {REVIEWS.map((r, i) => (
            <figure className="review" key={r.name} data-reveal style={{ '--i': i, '--r': `${((i * 29) % 7) - 3}deg` }}>
              <Stars />
              <blockquote>
                <p className="review-title">{r.title}</p>
                <p>{r.body}</p>
              </blockquote>
              <figcaption>
                <img src={pose(r.pose)} alt="" loading="lazy" />
                <span><strong>{r.name}</strong>{r.where}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="final" data-scroll="through">
      <Burst points={18} inner={0.78} className="final-burst" />
      <div className="shell final-inner" data-reveal>
        <DieCut name="victory-dance" alt="swolie doing a victory dance" burst="lime" points={16} className="final-mascot" />
        <div className="final-brand">
          <img src={`${base}images/appicon-light.png`} alt="" />
          <span>swolie</span>
        </div>
        <h2 className="display">Your next set<br />starts here.</h2>
        <AppStoreBadge className="big" />
        <p className="final-meta">iPhone · Apple Watch · your virtual gym buddy</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div className="footer-brand">
          <img src={`${base}images/appicon-light.png`} alt="" />
          <div><strong>swolie</strong><span>Need a spot? <a href="mailto:support@swolie.com">support@swolie.com</a></span></div>
        </div>
        <div className="footer-links">
          <a href="/privacy/index.html">Privacy</a>
          <a href="/terms/index.html">Terms</a>
          <a href="mailto:support@swolie.com">Support</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} swolie. Made for the next set.</p>
      </div>
      <Sticker name="resting" className="footer-sticker" />
    </footer>
  )
}

export default function App() {
  useScrollVars()
  useReveal()
  return (
    <div className="page">
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Film />
        <Features />
        <Everywhere />
        <MuscleMap />
        <RecapReel />
        <Extras />
        <Moods />
        <Reviews />
        <FinalCta />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </div>
  )
}
