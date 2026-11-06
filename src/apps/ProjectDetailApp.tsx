import { AppShell, StatusBar } from "../os/AppChrome";
import { useDesktop } from "../os/DesktopContext";
import { SystemIcon } from "../os/SystemIcon";
import { findProject } from "../content/projects";
import type { WindowInstance } from "../os/types";

function statusClass(status: string) {
  return status.toLowerCase().replaceAll(" ", "-");
}

export function ProjectDetailApp({ win }: { win: WindowInstance }) {
  const { openApp } = useDesktop();
  const project = win.payload ? findProject(win.payload) : undefined;

  if (!project) {
    return (
      <AppShell windowId={win.id} className="project-detail-app">
        <div className="empty-state empty-state--page">
          <SystemIcon name="folder" size={54} />
          <h2>That project folder is empty.</h2>
          <p>The link might be old. The projects window has the current list.</p>
          <button type="button" className="btn btn--primary" onClick={() => openApp("projects")}>
            Open My Projects
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell windowId={win.id} className="project-detail-app">
      <div className="project-detail-toolbar">
        <button type="button" className="toolbar-link" onClick={() => openApp("projects")}>
          <span aria-hidden="true">←</span> All projects
        </button>
        <span className="file-path">C:\Users\Vraj\Projects\{project.fileName}</span>
      </div>

      <div className="app-scroll project-detail-scroll">
        <header className={`project-sheet-hero accent-${project.accent}`}>
          <div className="project-sheet-icon" aria-hidden="true">
            <SystemIcon name="projects" size={64} />
          </div>
          <div className="project-sheet-heading">
            <p className="file-path">project_sheet.html</p>
            <h1>{project.name}</h1>
            <p className="project-sheet-summary">{project.summary}</p>
            <div className="project-sheet-badges">
              <span className={`badge badge--${statusClass(project.status)}`}>{project.status}</span>
              <span className="badge badge--quiet">Portfolio project</span>
            </div>
          </div>
        </header>

        <div className="project-sheet-grid">
          <div className="project-sheet-main">
            <section className="panel">
              <h2>The idea</h2>
              <p>{project.description}</p>
              {project.note ? (
                <p className="project-note">
                  <strong>Scope note:</strong> {project.note}
                </p>
              ) : null}
            </section>

            <section className="panel">
              <h2>What I focused on</h2>
              <ul className="tick-list">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="project-sheet-side">
            <section className="panel">
              <h2>Stack</h2>
              <ul className="chip-row">
                {project.tech.map((tech) => (
                  <li className="chip" key={tech}>
                    {tech}
                  </li>
                ))}
              </ul>
            </section>

            <section className="panel">
              <h2>Links</h2>
              <dl className="link-list">
                <div>
                  <dt>Repository</dt>
                  <dd>
                    {project.repoUrl ? (
                      <a href={project.repoUrl} target="_blank" rel="noreferrer">
                        Open on GitHub
                      </a>
                    ) : (
                      <span className="placeholder-link">Repository coming soon</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Live demo</dt>
                  <dd>
                    {project.demoUrl ? (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer">
                        Open demo
                      </a>
                    ) : (
                      <span className="placeholder-link">
                        {project.status === "Concept" ? "No demo for this concept" : "Demo not available"}
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
              <p className="panel-note">
                No links have been invented. If a repository exists, it will be added here.
              </p>
            </section>

            <section className="panel panel--tinted">
              <h2>Project status</h2>
              <p>
                {project.status === "Academic project"
                  ? "Built as part of coursework. The focus was learning the underlying ideas, not shipping a product."
                  : project.status === "Personal build"
                    ? "A personal project. It works, and it taught me something useful along the way."
                    : project.status === "Concept"
                      ? "A design and development concept. It is presented as an experiment, not a delivered project."
                      : "Still being built."}
              </p>
            </section>
          </aside>
        </div>

        <div className="project-sheet-footer">
          <button type="button" className="btn" onClick={() => openApp("projects")}>
            Back to all projects
          </button>
          <button type="button" className="btn btn--primary" onClick={() => openApp("contact")}>
            Talk about it
          </button>
        </div>
      </div>

      <StatusBar left={project.name} right={project.status} />
    </AppShell>
  );
}
