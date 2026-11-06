import { Check } from "lucide-react";
import { AppShell, StatusBar } from "../os/AppChrome";
import { useDesktop } from "../os/DesktopContext";
import { useWindowInstance } from "../os/DesktopContext";
import type { WallpaperId } from "../os/types";

const options: { id: WallpaperId; name: string; description: string }[] = [
  {
    id: "teal",
    name: "Classic teal",
    description: "The one this desktop was built around.",
  },
  {
    id: "dusk",
    name: "Deep dusk",
    description: "A quieter navy for late-night reading.",
  },
  {
    id: "slate",
    name: "Blueprint",
    description: "Graph-paper grey, for planning things that never ship.",
  },
];

export function DisplayApp({ windowId }: { windowId: string }) {
  const { wallpaper, setWallpaper, closeWindow } = useDesktop();
  const win = useWindowInstance(windowId);

  return (
    <AppShell windowId={windowId} className="display-app">
      <div className="app-scroll display-scroll">
        <header className="display-header">
          <h2>Display Properties</h2>
          <p>Choose a desktop background. Changes are saved on this device.</p>
        </header>

        <div className="display-preview">
          <div className="display-monitor">
            <div className={`display-screen wallpaper-${wallpaper}`} aria-hidden="true">
              <div className="mini-desktop-icons">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="mini-window">
                <span className="mini-window-bar" />
                <span className="mini-window-body" />
              </div>
              <div className="mini-taskbar" />
              <span className="mini-note" />
            </div>
          </div>
          <div className="display-preview-caption">
            <strong>{options.find((option) => option.id === wallpaper)?.name}</strong>
            <span>Preview</span>
          </div>
        </div>

        <fieldset className="wallpaper-options">
          <legend>Wallpaper</legend>
          {options.map((option) => (
            <label
              key={option.id}
              className={`wallpaper-option ${wallpaper === option.id ? "is-active" : ""}`}
            >
              <input
                type="radio"
                name="wallpaper"
                value={option.id}
                checked={wallpaper === option.id}
                onChange={() => setWallpaper(option.id)}
              />
              <span className={`wallpaper-chip wallpaper-${option.id}`} aria-hidden="true">
                <span className="wallpaper-chip-v">V</span>
              </span>
              <span className="wallpaper-copy">
                <span className="wallpaper-name">{option.name}</span>
                <span className="wallpaper-desc">{option.description}</span>
              </span>
              {wallpaper === option.id ? (
                <span className="wallpaper-check" aria-hidden="true">
                  <Check size={13} strokeWidth={2.4} />
                </span>
              ) : null}
            </label>
          ))}
        </fieldset>

        <div className="display-note">
          <span className="info-glyph" aria-hidden="true">i</span>
          <p>
            This is the whole theme system: no dark mode toggle, no settings maze.
            The desktop was designed to look like this.
          </p>
        </div>
      </div>

      <div className="display-actions">
        <button type="button" className="btn" onClick={() => setWallpaper("teal")}>
          Reset to classic
        </button>
        <button type="button" className="btn btn--primary" onClick={() => closeWindow(windowId)}>
          Close
        </button>
      </div>

      <StatusBar
        left={`Wallpaper: ${options.find((option) => option.id === wallpaper)?.name}`}
        right={win?.title ?? "Display"}
      />
    </AppShell>
  );
}
