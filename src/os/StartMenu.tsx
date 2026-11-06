import { useEffect, useRef, useState, type FormEvent } from "react";
import { Power, Search } from "lucide-react";
import { useDesktop } from "./DesktopContext";
import { SystemIcon } from "./SystemIcon";
import { profile } from "../content/profile";
import type { AppId, IconName } from "./types";

type StartEntry = {
  appId: AppId;
  label: string;
  icon: IconName;
  group: "Portfolio" | "System";
};

const entries: StartEntry[] = [
  { appId: "about", label: "About Me", icon: "user", group: "Portfolio" },
  { appId: "projects", label: "My Projects", icon: "projects", group: "Portfolio" },
  { appId: "skills", label: "Skills", icon: "skills", group: "Portfolio" },
  { appId: "beyond", label: "Beyond Technology", icon: "camera", group: "Portfolio" },
  { appId: "resume", label: "Resume", icon: "resume", group: "Portfolio" },
  { appId: "contact", label: "Contact", icon: "mail", group: "Portfolio" },
  { appId: "computer", label: "My Computer", icon: "computer", group: "System" },
  { appId: "recycle", label: "Recycle Bin", icon: "bin", group: "System" },
  { appId: "terminal", label: "Terminal", icon: "terminal", group: "System" },
  { appId: "display", label: "Display Properties", icon: "display", group: "System" },
  { appId: "notes", label: "Notes", icon: "notepad", group: "System" },
];

export function StartMenu({
  onClose,
  onCloseAndFocus,
  onShutDown,
}: {
  onClose: () => void;
  onCloseAndFocus: () => void;
  onShutDown: () => void;
}) {
  const { openApp, isMobile } = useDesktop();
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobile) return;
    const timer = window.setTimeout(() => searchRef.current?.focus(), 30);
    return () => window.clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseAndFocus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCloseAndFocus]);

  const needle = query.trim().toLowerCase();
  const results = needle
    ? entries.filter((entry) =>
        `${entry.label} ${entry.group}`.toLowerCase().includes(needle),
      )
    : entries;

  const launch = (entry: StartEntry) => {
    openApp(entry.appId);
    onClose();
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (results[0]) launch(results[0]);
  };

  const grouped = (["Portfolio", "System"] as const).map((group) => ({
    group,
    items: results.filter((entry) => entry.group === group),
  }));

  return (
    <div className="start-menu" role="dialog" aria-label="Start menu">
      <div className="start-rail" aria-hidden="true">
        <span>VrajOS</span>
        <span>personal edition</span>
      </div>
      <div className="start-content">
        <header className="start-user">
          <span className="start-avatar" aria-hidden="true">VB</span>
          <div>
            <strong>{profile.name}</strong>
            <span>VrajOS 1.0 · {profile.year} student</span>
          </div>
        </header>

        <form className="start-search" onSubmit={onSubmit} role="search">
          <Search size={13} strokeWidth={2} aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find an app"
            aria-label="Search applications"
          />
        </form>

        <div className="start-list">
          {grouped.map(({ group, items }) => {
            if (items.length === 0) return null;
            return (
              <section key={group} aria-labelledby={`start-${group}`}>
                <h2 className="start-group" id={`start-${group}`}>
                  {group}
                </h2>
                <ul>
                  {items.map((entry) => (
                    <li key={entry.appId}>
                      <button
                        type="button"
                        className="start-item"
                        onClick={() => launch(entry)}
                        data-start-app={entry.appId}
                      >
                        <span className="start-item-icon">
                          <SystemIcon name={entry.icon} size={28} />
                        </span>
                        <span className="start-item-label">{entry.label}</span>
                        <span className="start-item-arrow" aria-hidden="true">›</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          {results.length === 0 ? (
            <p className="start-empty">
              No apps match “{query}”. Try “about”, “projects” or “terminal”.
            </p>
          ) : null}
        </div>

        <footer className="start-footer">
          <button type="button" className="start-shutdown" onClick={() => { onClose(); onShutDown(); }}>
            <Power size={15} strokeWidth={1.8} aria-hidden="true" />
            <span>Shut Down...</span>
          </button>
          <span className="start-hint">{isMobile ? "Tap to open" : "Enter opens the first result"}</span>
        </footer>
      </div>
    </div>
  );
}
