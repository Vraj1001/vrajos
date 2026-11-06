import { AppShell, StatusBar } from "../os/AppChrome";
import { SystemIcon } from "../os/SystemIcon";
import { film, football, fragrance, gaming, movies, photography } from "../content/interests";

function SceneArt({ scene }: { scene: "road" | "car" | "people" }) {
  if (scene === "road") {
    return (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="300" height="200" fill="#5f9c92" />
        <rect y="112" width="300" height="88" fill="#24524d" />
        <circle cx="229" cy="52" r="23" fill="#f4d68a" opacity="0.9" />
        <path d="M0 112l68-37 48 23 48-47 58 51 78-33v44H0z" fill="#3b756d" />
        <path d="M0 126l80-22 52 17 47-27 60 29 61-16v93H0z" fill="#2d5d56" />
        <path d="M118 200l36-95h24l40 95z" fill="#394847" />
        <path d="M155 111h8l5 11h-18zM147 143h26l4 10h-34zM139 174h46l5 12h-56z" fill="#d8cfa9" opacity="0.8" />
        <path d="M0 147h96M204 147h96" stroke="#7eafa1" strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }

  if (scene === "car") {
    return (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="300" height="200" fill="#c08e4e" />
        <circle cx="74" cy="48" r="28" fill="#f1d49b" opacity="0.75" />
        <path d="M0 130l28-19 24 10 20-13 30 17 34-19 36 16 41-22 37 20 50-13v93H0z" fill="#9b6d38" />
        <rect y="138" width="300" height="62" fill="#5f4a35" />
        <path d="M0 150h300" stroke="#7a6146" />
        <path d="M82 133c5-10 17-18 34-18h66c17 0 29 7 37 18l16 5c8 3 13 9 13 17v15H58v-17c0-8 8-16 18-18z" fill="#243034" />
        <path d="M103 118h72c12 0 20 5 26 15H90c3-8 7-15 13-15z" fill="#5f8890" />
        <path d="M112 121h22v12h-28zM143 121h31l7 12h-38z" fill="#9bc3c1" opacity="0.8" />
        <circle cx="110" cy="150" r="17" fill="#1b2426" />
        <circle cx="110" cy="150" r="8" fill="#8f958f" />
        <circle cx="231" cy="150" r="17" fill="#1b2426" />
        <circle cx="231" cy="150" r="8" fill="#8f958f" />
        <rect x="261" y="137" width="12" height="5" fill="#f2b83c" />
        <path d="M65 137h15M251 137h11" stroke="#111" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="300" height="200" fill="#795a78" />
      <circle cx="210" cy="54" r="28" fill="#e6b98a" opacity="0.85" />
      <path d="M0 136l45-40 48 28 42-34 56 42 54-31 55 36v63H0z" fill="#4e3c54" />
      <rect y="142" width="300" height="58" fill="#302a39" />
      <g fill="#1e1b24">
        <circle cx="95" cy="104" r="13" />
        <path d="M77 142c2-22 8-30 18-30s16 8 18 30z" />
        <circle cx="152" cy="94" r="14" />
        <path d="M133 142c2-26 9-37 19-37s17 11 19 37z" />
        <circle cx="211" cy="106" r="13" />
        <path d="M193 142c2-22 8-30 18-30s16 8 18 30z" />
      </g>
      <path d="M118 135l13-10M176 145l11-13" stroke="#d9b79d" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="152" cy="174" rx="80" ry="6" fill="#24202b" />
    </svg>
  );
}

export function BeyondApp({ windowId }: { windowId: string }) {
  return (
    <AppShell windowId={windowId} className="beyond-app">
      <div className="app-scroll beyond-scroll">
        <header className="beyond-hero">
          <div>
            <p className="file-path">C:\Users\Vraj\Off_Topic</p>
            <h1>Off the clock</h1>
            <p>
              The parts of my life that aren't a project, a deadline or a database.
              These are the things I'd still be doing if nobody asked for a portfolio.
            </p>
          </div>
          <div className="beyond-stamp" aria-hidden="true">
            <span>OFF</span>
            <span>THE</span>
            <span>CLOCK</span>
          </div>
        </header>

        <section className="photo-section panel" aria-labelledby="photo-heading">
          <div className="photo-heading">
            <div>
              <h2 id="photo-heading">Photography</h2>
              <p>{photography.intro}</p>
            </div>
            <SystemIcon name="camera" size={40} />
          </div>

          <div className="contact-sheet">
            {photography.frames.map((frame, index) => (
              <figure className={`film-frame film-frame--${frame.tone}`} key={frame.id}>
                <div className="film-image">
                  <SceneArt scene={frame.scene} />
                  <span className="stand-in-tag">stand-in</span>
                  <span className="frame-number">0{index + 1}</span>
                </div>
                <figcaption>
                  <span className="frame-label">{frame.label}</span>
                  <span className="frame-caption">{frame.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="photo-note">
            <span className="info-glyph" aria-hidden="true">i</span>
            {photography.note}
          </p>
        </section>

        <div className="beyond-grid">
          <section className="panel hobby-card hobby-card--film">
            <div className="hobby-head">
              <h2>Video editing</h2>
              <span className="hobby-mark" aria-hidden="true">▶</span>
            </div>
            <p>{film.intro}</p>
            <div className="edit-timeline" aria-label="A stylised editing timeline">
              {film.timeline.map((clip, index) => (
                <span
                  key={clip}
                  className={`timeline-clip clip-${index + 1}`}
                  style={{ flexGrow: index === 2 ? 2.2 : 1 }}
                >
                  {clip}
                </span>
              ))}
              <span className="playhead" aria-hidden="true" />
            </div>
            <p className="hobby-note">{film.note}</p>
          </section>

          <section className="panel hobby-card hobby-card--gaming">
            <div className="hobby-head">
              <h2>Gaming</h2>
              <span className="dpad" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
            <p>{gaming.intro}</p>
            <ul className="chip-row">
              {gaming.tags.map((tag) => (
                <li className="chip chip--quiet" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </section>

          <section className="panel hobby-card hobby-card--football">
            <div className="hobby-head">
              <h2>Football</h2>
              <span className="mini-ball" aria-hidden="true" />
            </div>
            <p>{football.intro}</p>
            <div className="pitch" aria-hidden="true">
              <span className="pitch-line" />
              <span className="pitch-circle" />
              <span className="pitch-goal pitch-goal--left" />
              <span className="pitch-goal pitch-goal--right" />
            </div>
          </section>

          <section className="panel hobby-card hobby-card--movies">
            <div className="hobby-head">
              <h2>Films</h2>
              <span className="hobby-mark" aria-hidden="true">✂</span>
            </div>
            <p>{movies.intro}</p>
            <ul className="ticket-list">
              {movies.tickets.map((ticket) => (
                <li className="ticket" key={ticket.title}>
                  <span className="ticket-title">{ticket.title}</span>
                  <span className="ticket-detail">{ticket.detail}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel hobby-card hobby-card--fragrance">
            <div className="hobby-head">
              <h2>Fragrance notes</h2>
              <span className="hobby-mark hobby-mark--bottle" aria-hidden="true" />
            </div>
            <div className="fragrance-layout">
              <div>
                <p>{fragrance.intro}</p>
                <p className="hobby-note">{fragrance.weather}</p>
              </div>
              <div className="note-pyramid">
                <div className="note-tier">
                  <span className="note-tier-label">Top</span>
                  <ul>
                    {fragrance.notes.top.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
                <div className="note-tier">
                  <span className="note-tier-label">Heart</span>
                  <ul>
                    {fragrance.notes.heart.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
                <div className="note-tier">
                  <span className="note-tier-label">Base</span>
                  <ul>
                    {fragrance.notes.base.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="beyond-footer">
          <p>None of this needs a monitor. But most of it ends up on one eventually.</p>
          <span className="beyond-signature">— Vraj</span>
        </footer>
      </div>

      <StatusBar left="Six things that keep me off the keyboard" right="Beyond Technology" />
    </AppShell>
  );
}
