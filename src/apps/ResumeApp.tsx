import { AppShell, StatusBar } from "../os/AppChrome";
import { useDesktop } from "../os/DesktopContext";
import { SystemIcon } from "../os/SystemIcon";
import { education, profile } from "../content/profile";
import { projects } from "../content/projects";
import { skillCategories } from "../content/skills";

export function ResumeApp({ windowId }: { windowId: string }) {
  const { openApp } = useDesktop();

  return (
    <AppShell windowId={windowId} className="resume-app">
      <div className="resume-toolbar">
        <span className="resume-file">
          <SystemIcon name="resume" size={18} />
          {profile.resume.fileName}
        </span>
        <span className="resume-unavailable">
          <span className="led led--amber" />
          PDF not attached
        </span>
      </div>

      <div className="app-scroll resume-scroll">
        <div className="resume-note-bar">
          <span className="info-glyph" aria-hidden="true">i</span>
          {profile.resume.note}
        </div>

        <article className="resume-paper" aria-label="Resume content">
          <header className="resume-header">
            <div>
              <h1>{profile.name}</h1>
              <p className="resume-role">{profile.role}</p>
              <p className="resume-location">{profile.location}</p>
            </div>
            <div className="resume-mark" aria-hidden="true">
              VB
            </div>
          </header>

          <section className="resume-section">
            <h2>Profile</h2>
            <p>
              Third-year Artificial Intelligence and Data Science student at NMIMS
              MPSTME, Navi Mumbai. Interested in software development, AI and data
              work, with hands-on project experience across web, Android, databases
              and analytics. Currently exploring where to specialise.
            </p>
          </section>

          <section className="resume-section">
            <h2>Education</h2>
            <div className="resume-row">
              <div>
                <h3>{education.degree}</h3>
                <p>{education.institution}</p>
                <p className="muted">{education.location}</p>
              </div>
              <span className="resume-date">{education.stage}</span>
            </div>
            <p className="resume-small">{education.note}</p>
          </section>

          <section className="resume-section">
            <h2>Technical skills</h2>
            <dl className="resume-skill-list">
              {skillCategories.map((category) => (
                <div key={category.id}>
                  <dt>{category.label}</dt>
                  <dd>{category.skills.map((skill) => skill.name).join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="resume-section">
            <h2>Selected projects</h2>
            <ul className="resume-projects">
              {projects.slice(0, 5).map((project) => (
                <li key={project.id}>
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.summary}</p>
                  </div>
                  <button
                    type="button"
                    className="inline-link"
                    onClick={() => openApp("project", project.id, `${project.name} — Project`)}
                    aria-label={`Open ${project.name} project details`}
                  >
                    Open
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="inline-link resume-all-projects" onClick={() => openApp("projects")}>
              See all eight projects
            </button>
          </section>

          <section className="resume-section">
            <h2>Interests</h2>
            <p>
              Photography (travel, automotive and moments with friends), video
              editing and film montages, story-driven games, football, horror and
              comedy films, and writing about fragrance notes and performance.
            </p>
          </section>

          <footer className="resume-footer">
            <p>
              Full contact details are in the Contact window. A downloadable PDF
              will replace this note once the file is available.
            </p>
          </footer>
        </article>

        <div className="resume-actions">
          <button type="button" className="btn" onClick={() => openApp("contact")}>
            Open Contact
          </button>
          <button type="button" className="btn" onClick={() => openApp("projects")}>
            Browse projects
          </button>
        </div>
      </div>

      <StatusBar left="Resume · current portfolio content" right="Download unavailable" />
    </AppShell>
  );
}
