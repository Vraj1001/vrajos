import { useState, type KeyboardEvent } from "react";
import { FolderOpen } from "lucide-react";
import { AddressBar, AppShell, StatusBar, ToolbarButton } from "../os/AppChrome";
import { useDesktop } from "../os/DesktopContext";
import { SystemIcon } from "../os/SystemIcon";
import type { AppId, IconName } from "../os/types";
import { profile } from "../content/profile";

type FolderDef = {
  id: string;
  label: string;
  detail: string;
  appId: AppId;
  icon: IconName;
};

const folders: FolderDef[] = [
  {
    id: "about",
    label: "About Me",
    detail: "The short story, education and where I'm headed.",
    appId: "about",
    icon: "user",
  },
  {
    id: "projects",
    label: "Projects",
    detail: "Eight things I've built, broken and learned from.",
    appId: "projects",
    icon: "projects",
  },
  {
    id: "skills",
    label: "Skills",
    detail: "Languages, tools and areas I'm exploring.",
    appId: "skills",
    icon: "skills",
  },
  {
    id: "interests",
    label: "Interests",
    detail: "Photography, edits, games, football, films, fragrance.",
    appId: "beyond",
    icon: "camera",
  },
  {
    id: "contact",
    label: "Contact",
    detail: "How to get in touch once the details are added.",
    appId: "contact",
    icon: "mail",
  },
];

const quickLinks: { label: string; appId: AppId; icon: IconName }[] = [
  { label: "My Projects", appId: "projects", icon: "projects" },
  { label: "Beyond Technology", appId: "beyond", icon: "camera" },
  { label: "Resume", appId: "resume", icon: "resume" },
  { label: "Recycle Bin", appId: "recycle", icon: "bin" },
];

export function MyComputerApp({ windowId }: { windowId: string }) {
  const { openApp, isMobile } = useDesktop();
  const [selected, setSelected] = useState<string | null>(null);
  const selectedFolder = folders.find((folder) => folder.id === selected);

  const openFolder = (folder: FolderDef) => {
    openApp(folder.appId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, folder: FolderDef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openFolder(folder);
    }
  };

  return (
    <AppShell windowId={windowId} className="computer-app">
      <AddressBar path="My Computer">
        <ToolbarButton
          title={selectedFolder ? `Open ${selectedFolder.label}` : "Select a folder to open"}
          disabled={!selectedFolder}
          onClick={() => {
            if (selectedFolder) openFolder(selectedFolder);
          }}
        >
          <FolderOpen size={15} strokeWidth={1.6} />
          <span>Open</span>
        </ToolbarButton>
      </AddressBar>

      <div className="explorer-body">
        <aside className="explorer-sidebar" aria-label="Places">
          <h2 className="sidebar-heading">Places</h2>
          <ul className="place-list">
            <li>
              <button type="button" className="place-item is-current">
                <SystemIcon name="computer" size={18} />
                <span>My Computer</span>
              </button>
            </li>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  className="place-item"
                  onClick={() => openApp(link.appId)}
                >
                  <SystemIcon name={link.icon} size={18} />
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="sidebar-note">
            <span className="led led--on" />
            System nominal
          </div>
        </aside>

        <div className="explorer-main">
          <div className="explorer-files-wrap">
            <div className="explorer-files" role="group" aria-label="My Computer folders">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  type="button"
                  className={`file-tile ${selected === folder.id ? "is-selected" : ""}`}
                  aria-pressed={selected === folder.id}
                  onClick={() => {
                    if (isMobile) {
                      openFolder(folder);
                    } else {
                      setSelected(folder.id);
                    }
                  }}
                  onDoubleClick={() => openFolder(folder)}
                  onKeyDown={(event) => handleKeyDown(event, folder)}
                >
                  <SystemIcon name={folder.icon} size={44} />
                  <span className="file-tile-name">{folder.label}</span>
                  <span className="file-tile-detail">{folder.detail}</span>
                </button>
              ))}
            </div>
          </div>

          <aside className="system-panel" aria-label="System information">
            <div className="system-panel-head">
              <SystemIcon name="computer" size={38} />
              <div>
                <h2>VrajOS</h2>
                <p>Personal Computing Environment</p>
              </div>
            </div>
            <dl className="system-list">
              <div>
                <dt>System name</dt>
                <dd>{profile.systemName}</dd>
              </div>
              <div>
                <dt>User</dt>
                <dd>{profile.name}</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>B.Tech AI &amp; DS</dd>
              </div>
              <div>
                <dt>Institution</dt>
                <dd>NMIMS MPSTME</dd>
              </div>
              <div>
                <dt>System type</dt>
                <dd>Personal portfolio</dd>
              </div>
              <div>
                <dt>Version</dt>
                <dd>{profile.systemVersion}</dd>
              </div>
            </dl>
            <p className="system-footnote">
              {selectedFolder
                ? selectedFolder.detail
                : isMobile
                  ? "Tap a folder to open it."
                  : "Double-click a folder to open it."}
            </p>
          </aside>
        </div>
      </div>

      <StatusBar
        left={`${folders.length} objects`}
        right={selectedFolder ? selectedFolder.label : "My Computer"}
      />
    </AppShell>
  );
}
