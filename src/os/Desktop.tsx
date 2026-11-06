import { useCallback, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { useDesktop } from "./DesktopContext";
import { SystemIcon } from "./SystemIcon";
import { DesktopContextMenu } from "./DesktopContextMenu";
import { binHint } from "../content/recycleBin";
import { useNow } from "../hooks/useEnvironment";
import type { AppId, IconName } from "./types";

type DesktopIconDef = { appId: AppId; label: string; icon: IconName };

const desktopIcons: DesktopIconDef[] = [
  { appId: "computer", label: "My Computer", icon: "computer" },
  { appId: "about", label: "About Me", icon: "user" },
  { appId: "projects", label: "My Projects", icon: "projects" },
  { appId: "skills", label: "Skills", icon: "skills" },
  { appId: "beyond", label: "Beyond Technology", icon: "camera" },
  { appId: "resume", label: "Resume", icon: "resume" },
  { appId: "contact", label: "Contact", icon: "mail" },
  { appId: "recycle", label: "Recycle Bin", icon: "bin" },
];

export function DesktopIcon({
  label,
  icon,
  appId,
  selected,
  onSelect,
  onOpen,
}: {
  label: string;
  icon: IconName;
  appId: AppId;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}) {
  const { isMobile } = useDesktop();
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <button
      type="button"
      className={`desktop-icon ${selected ? "is-selected" : ""}`}
      data-app-icon={appId}
      aria-label={`${label}. ${isMobile ? "Tap to open." : "Double-click or press Enter to open."}`}
      aria-pressed={selected}
      onClick={() => {
        if (isMobile) {
          onOpen();
        } else {
          onSelect();
        }
      }}
      onDoubleClick={onOpen}
      onFocus={onSelect}
      onKeyDown={handleKeyDown}
    >
      <span className="desktop-icon-image" aria-hidden="true">
        <SystemIcon name={icon} size={44} />
      </span>
      <span className="desktop-icon-label">{label}</span>
    </button>
  );
}

export function Desktop() {
  const { openApp, windows, isMobile } = useDesktop();
  const [selected, setSelected] = useState<string | null>(null);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const now = useNow();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const open = (appId: AppId) => openApp(appId);
  const closeMenu = useCallback(() => setMenu(null), []);

  return (
    <div
      className="desktop"
      onPointerDown={() => setSelected(null)}
      onContextMenu={(event) => {
        if (isMobile) return;
        event.preventDefault();
        setSelected(null);
        setMenu({ x: event.clientX, y: event.clientY });
      }}
    >
      {isMobile ? (
        <header className="mobile-topbar">
          <div className="mobile-brand">
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>VrajOS</span>
          </div>
          <div className="mobile-topbar-meta">
            <span className="led led--on" aria-hidden="true" />
            <span>
              {now.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </span>
          </div>
        </header>
      ) : null}

      <div className="desktop-intro">
        {isMobile ? (
          <>
            <p className="desktop-kicker">Vraj Bhatt's desktop</p>
            <h1>{greeting}.</h1>
            <p className="desktop-intro-copy">
              AI &amp; Data Science student, project collector and occasional
              photographer. Tap an app to look around.
            </p>
          </>
        ) : (
          <p className="desktop-hint-line">
            {windows.length === 0
              ? "Double-click an icon to open a window."
              : `${windows.length} ${windows.length === 1 ? "window" : "windows"} open — try the taskbar.`}
          </p>
        )}
      </div>

      <div
        className="desktop-icons"
        id="desktop-apps"
        role="group"
        aria-label="Desktop icons"
        tabIndex={-1}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {desktopIcons.map((item) => (
          <DesktopIcon
            key={item.appId}
            {...item}
            selected={selected === item.appId}
            onSelect={() => setSelected(item.appId)}
            onOpen={() => open(item.appId)}
          />
        ))}
      </div>

      {menu
        ? createPortal(
            <DesktopContextMenu x={menu.x} y={menu.y} onClose={closeMenu} />,
            document.body,
          )
        : null}

      <button
        type="button"
        className="sticky-note"
        onClick={() => open("recycle")}
        aria-label={`Open the Recycle Bin. ${binHint}`}
      >
        <span className="sticky-pin" aria-hidden="true" />
        <span className="sticky-label">psst...</span>
        <span className="sticky-text">{binHint}</span>
        <span className="sticky-sign">— a note to self</span>
      </button>

      {!isMobile ? (
        <div className="desktop-corner" aria-hidden="true">
          <span>VrajOS</span>
          <span>build 2000.26</span>
        </div>
      ) : null}
    </div>
  );
}
