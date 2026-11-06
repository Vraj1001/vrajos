import { AboutApp } from "../apps/AboutApp";
import { MyComputerApp } from "../apps/MyComputerApp";
import { ProjectsApp } from "../apps/ProjectsApp";
import { ProjectDetailApp } from "../apps/ProjectDetailApp";
import { SkillsApp } from "../apps/SkillsApp";
import { BeyondApp } from "../apps/BeyondApp";
import { ResumeApp } from "../apps/ResumeApp";
import { ContactApp } from "../apps/ContactApp";
import { RecycleBinApp } from "../apps/RecycleBinApp";
import { TerminalApp } from "../apps/TerminalApp";
import { DisplayApp } from "../apps/DisplayApp";
import { NotesApp } from "../apps/NotesApp";
import { AppShell } from "./AppChrome";
import { SystemIcon } from "./SystemIcon";
import type { WindowInstance } from "./types";

export function AppSurface({ win }: { win: WindowInstance }) {
  switch (win.appId) {
    case "computer":
      return <MyComputerApp windowId={win.id} />;
    case "about":
      return <AboutApp windowId={win.id} />;
    case "projects":
      return <ProjectsApp windowId={win.id} />;
    case "project":
      return <ProjectDetailApp win={win} />;
    case "skills":
      return <SkillsApp windowId={win.id} />;
    case "beyond":
      return <BeyondApp windowId={win.id} />;
    case "resume":
      return <ResumeApp windowId={win.id} />;
    case "contact":
      return <ContactApp windowId={win.id} />;
    case "recycle":
      return <RecycleBinApp windowId={win.id} />;
    case "terminal":
      return <TerminalApp windowId={win.id} />;
    case "display":
      return <DisplayApp windowId={win.id} />;
    case "notes":
      return <NotesApp windowId={win.id} />;
    default:
      return (
        <AppShell windowId={win.id}>
          <div className="empty-state">
            <SystemIcon name="file" size={48} />
            <p>This application is not installed.</p>
          </div>
        </AppShell>
      );
  }
}
