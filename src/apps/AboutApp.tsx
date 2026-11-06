import { AppShell, StatusBar } from "../os/AppChrome";
import { useDesktop } from "../os/DesktopContext";
import { SystemIcon } from "../os/SystemIcon";
import { aboutTimeline, education, profile } from "../content/profile";

export function AboutApp({ windowId }: { windowId: string }) {
  const { openApp } = useDesktop();

  return (
    <AppShell windowId={windowId} className="about-app">
      <div className="app-scroll about-scroll">
        <header className="about-hero">
          <div className="about-portrait" aria-hidden="true">
            <div className="portrait-bezel">
              <span className="portrait-initials">VB</span>
              <span className="portrait-caption">personal edition</span>
            </div>
            <span className="portrait-status">
              <span className="led led--on" />
              online
            </span>
          </div>

          <div className="about-heading">
            <p className="file-path">C:\Users\Vraj\about_me.txt</p>
            <h1>Hey, I'm Vraj.</h1>
            <p className="about-lead">
              A third-year AI &amp; Data Science student in Navi Mumbai, currently
              building things to figure out what I want to build next.
            </p>
            <ul className="chip-row" aria-label="Interests">
              <li className="chip">Software</li>
              <li className="chip">AI &amp; data</li>
              <li className="chip">Web</li>
              <li className="chip">Creative technology</li>
            </ul>
          </div>
        </header>

        <div className="about-columns">
          <section className="panel about-story">
            <h2>A quick introduction</h2>
            {profile.intro.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="aside-line">
              If you want the formal version, the <button type="button" className="inline-link" onClick={() => openApp("resume")}>resume window</button> has
              it. If you want the honest version, keep reading.
            </p>
          </section>

          <aside className="panel about-facts" aria-label="Profile details">
            <h2>The short version</h2>
            <dl className="fact-list">
              <div>
                <dt>Studying</dt>
                <dd>B.Tech AI &amp; Data Science</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>Third year</dd>
              </div>
              <div>
                <dt>At</dt>
                <dd>NMIMS MPSTME, Navi Mumbai</dd>
              </div>
              <div>
                <dt>Currently</dt>
                <dd>Exploring software, AI and data</dd>
              </div>
              <div>
                <dt>Off-screen</dt>
                <dd>Photography, edits, football &amp; fragrance notes</dd>
              </div>
            </dl>
            <div className="currently-panel">
              <h3>On my desk right now</h3>
              <ul className="tick-list">
                {profile.currently.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="panel education-panel">
          <div className="panel-heading">
            <div>
              <h2>Education</h2>
              <p className="muted">The official line.</p>
            </div>
            <SystemIcon name="resume" size={34} />
          </div>
          <div className="education-grid">
            <div>
              <h3>{education.degree}</h3>
              <p className="education-place">
                {education.institution}
                <br />
                {education.location}
              </p>
            </div>
            <div className="education-meta">
              <span className="badge badge--current">{education.stage}</span>
              <ul className="chip-row" aria-label="Focus areas">
                {education.focus.map((item) => (
                  <li className="chip chip--quiet" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="education-note">{education.note}</p>
        </section>

        <section className="panel timeline-panel">
          <h2>How I got here (so far)</h2>
          <ol className="timeline">
            {aboutTimeline.map((item) => (
              <li key={item.marker} className={`timeline-item timeline-item--${item.tone}`}>
                <span className="timeline-marker">{item.marker}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="about-footer">
          <p>
            This portfolio is a small experiment too. If something feels like a
            dead end, tell me — I'd rather fix it than pretend it works.
          </p>
          <button type="button" className="btn" onClick={() => openApp("contact")}>
            Find me elsewhere
          </button>
        </div>
      </div>
      <StatusBar
        left={`${profile.name} · ${profile.year} · ${profile.location}`}
        right="about_me.txt"
      />
    </AppShell>
  );
}
