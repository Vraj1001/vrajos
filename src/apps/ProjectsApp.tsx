import { useDeferredValue, useMemo, useState, type KeyboardEvent } from "react";
import { FolderOpen, Search } from "lucide-react";
import { AddressBar, AppShell, StatusBar, ToolbarButton } from "../os/AppChrome";
import { useDesktop } from "../os/DesktopContext";
import { SystemIcon } from "../os/SystemIcon";
import {
  projectGroupFor,
  projectGroups,
  projects,
  type Project,
  type ProjectGroup,
} from "../content/projects";

function statusClass(status: Project["status"]) {
  return status.toLowerCase().replaceAll(" ", "-");
}

export function ProjectsApp({ windowId }: { windowId: string }) {
  const { openApp, isMobile } = useDesktop();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [group, setGroup] = useState<ProjectGroup>("all");
  const [selectedId, setSelectedId] = useState<string>(projects[0]?.id ?? "");

  const filtered = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const inGroup = group === "all" || projectGroupFor(project) === group;
      if (!inGroup) return false;
      if (!needle) return true;
      const haystack = [
        project.name,
        project.summary,
        project.description,
        project.status,
        ...project.tech,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [deferredQuery, group]);

  const selected = filtered.find((project) => project.id === selectedId) ?? filtered[0];

  const openProject = (project: Project) => {
    openApp("project", project.id, `${project.name} — Project`);
  };

  const onRowKeyDown = (event: KeyboardEvent<HTMLButtonElement>, project: Project) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openProject(project);
    }
  };

  const groupCount = (id: ProjectGroup) =>
    id === "all" ? projects.length : projects.filter((project) => projectGroupFor(project) === id).length;

  return (
    <AppShell windowId={windowId} className="projects-app">
      <AddressBar path="My Computer\Projects">
        <label className="search-box">
          <Search size={13} strokeWidth={2} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a project"
            aria-label="Search projects"
          />
        </label>
        <ToolbarButton
          title={selected ? `Open ${selected.name}` : "Select a project to open"}
          disabled={!selected}
          onClick={() => {
            if (selected) openProject(selected);
          }}
        >
          <FolderOpen size={15} strokeWidth={1.6} />
          <span>Open</span>
        </ToolbarButton>
      </AddressBar>

      <div className="explorer-body projects-body">
        <aside className="explorer-sidebar project-tree" aria-label="Project categories">
          <h2 className="sidebar-heading">Projects</h2>
          <ul className="place-list">
            {projectGroups.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`place-item ${group === item.id ? "is-current" : ""}`}
                  onClick={() => setGroup(item.id)}
                  aria-pressed={group === item.id}
                >
                  <SystemIcon
                    name={item.id === "academic" ? "resume" : item.id === "personal" ? "folder" : "projects"}
                    size={18}
                  />
                  <span>{item.label}</span>
                  <span className="place-count">{groupCount(item.id)}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="sidebar-note">
            <span className="led led--on" />
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </div>
        </aside>

        <div className="project-list-column">
          <div className="project-list-head" aria-hidden="true">
            <span>Name</span>
            <span>Focus</span>
            <span>Status</span>
          </div>
          <ul className="project-list" aria-label="Projects">
            {filtered.map((project) => (
              <li key={project.id}>
                <button
                  type="button"
                  className={`project-row ${selected?.id === project.id ? "is-selected" : ""}`}
                  onClick={() => {
                    if (isMobile) {
                      openProject(project);
                    } else {
                      setSelectedId(project.id);
                    }
                  }}
                  onDoubleClick={() => openProject(project)}
                  onKeyDown={(event) => onRowKeyDown(event, project)}
                  aria-pressed={selected?.id === project.id}
                >
                  <span className={`project-row-icon accent-${project.accent}`}>
                    <SystemIcon name="projects" size={26} />
                  </span>
                  <span className="project-row-main">
                    <span className="project-row-name">{project.name}</span>
                    <span className="project-row-summary">{project.summary}</span>
                  </span>
                  <span className="project-row-tech">{project.tech.slice(0, 2).join(" · ")}</span>
                  <span className={`badge badge--${statusClass(project.status)}`}>
                    {project.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <SystemIcon name="folder" size={42} />
              <p>No projects match that search.</p>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setQuery("");
                  setGroup("all");
                }}
              >
                Clear search
              </button>
            </div>
          ) : null}
        </div>

        <aside className="project-preview" aria-label="Project preview">
          {selected ? (
            <>
              <div className="project-preview-head">
                <SystemIcon name="projects" size={40} />
                <div>
                  <p className="file-path">C:\Users\Vraj\Projects\{selected.fileName}</p>
                  <h2>{selected.name}</h2>
                </div>
              </div>
              <div className="project-preview-meta">
                <span className={`badge badge--${statusClass(selected.status)}`}>
                  {selected.status}
                </span>
                <span className="preview-type">Project folder</span>
              </div>
              <p>{selected.description}</p>
              <div className="preview-section">
                <h3>Built with</h3>
                <ul className="chip-row">
                  {selected.tech.map((tech) => (
                    <li className="chip chip--quiet" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="preview-section">
                <h3>What I focused on</h3>
                <ul className="tick-list tick-list--tight">
                  {selected.highlights.slice(0, 2).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="preview-links">
                <p>
                  <span className="link-state">Repository</span>
                  {selected.repoUrl ? (
                    <a href={selected.repoUrl} target="_blank" rel="noreferrer">
                      Open repository
                    </a>
                  ) : (
                    <span className="placeholder-link">Coming soon</span>
                  )}
                </p>
                <p>
                  <span className="link-state">Live demo</span>
                  {selected.demoUrl ? (
                    <a href={selected.demoUrl} target="_blank" rel="noreferrer">
                      Open demo
                    </a>
                  ) : (
                    <span className="placeholder-link">Not available</span>
                  )}
                </p>
              </div>
              <button
                type="button"
                className="btn btn--primary preview-open"
                onClick={() => openProject(selected)}
              >
                Open project sheet
              </button>
              <p className="preview-hint">Double-click any project to open its full sheet.</p>
            </>
          ) : null}
        </aside>
      </div>

      <StatusBar
        left={`${filtered.length} of ${projects.length} projects`}
        right={group === "all" ? "All projects" : projectGroups.find((item) => item.id === group)?.label}
      />
    </AppShell>
  );
}
