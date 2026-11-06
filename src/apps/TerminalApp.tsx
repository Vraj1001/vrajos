import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { AppShell, StatusBar } from "../os/AppChrome";
import { useDesktop } from "../os/DesktopContext";
import { useIsMobile } from "../hooks/useEnvironment";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { skillCategories } from "../content/skills";
import { binHint } from "../content/recycleBin";
import type { AppId, WallpaperId } from "../os/types";

type Line = { id: number; text: string; tone?: "input" | "dim" | "accent" | "error" };

const commandNames = [
  "help",
  "about",
  "projects",
  "skills",
  "contact",
  "whoami",
  "neofetch",
  "open",
  "ls",
  "wallpaper",
  "date",
  "recycle",
  "clear",
  "exit",
  "sudo",
];

const aliases: Record<string, AppId> = {
  computer: "computer",
  about: "about",
  projects: "projects",
  skills: "skills",
  beyond: "beyond",
  interests: "beyond",
  resume: "resume",
  contact: "contact",
  recycle: "recycle",
  bin: "recycle",
  terminal: "terminal",
  display: "display",
  notes: "notes",
};

const wallpapers: WallpaperId[] = ["teal", "dusk", "slate"];

export function TerminalApp({ windowId }: { windowId: string }) {
  const { openApp, closeWindow, wallpaper, setWallpaper, notify, activeId } = useDesktop();
  const isMobile = useIsMobile();
  const [lines, setLines] = useState<Line[]>([
    { id: 0, text: "VrajOS Terminal [Version 1.0.0]", tone: "dim" },
    { id: 1, text: "(c) VrajOS Personal Computing. All curiosity reserved.", tone: "dim" },
    { id: 2, text: "" },
    { id: 3, text: "Type 'help' for the short list. Type 'open about' if you'd rather click.", tone: "accent" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const nextId = useRef(10);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeId === windowId && !isMobile) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(timer);
    }
  }, [activeId, windowId, isMobile]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines]);

  const push = (entries: { text: string; tone?: Line["tone"] }[]) => {
    setLines((current) => [
      ...current,
      ...entries.map((entry) => ({ ...entry, id: ++nextId.current })),
    ]);
  };

  const runCommand = (raw: string) => {
    const command = raw.trim();
    if (!command) return;
    push([{ text: `vraj@vrajos:~$ ${command}`, tone: "input" }]);
    const [base, ...args] = command.split(/\s+/);
    const name = base.toLowerCase();

    switch (name) {
      case "help":
        push([
          { text: "Available commands:", tone: "accent" },
          { text: "  about             the short version of me" },
          { text: "  projects          list every project folder" },
          { text: "  skills            what I've used so far" },
          { text: "  contact           where to find me" },
          { text: "  open <app>        open a window (about, projects, recycle...)" },
          { text: "  ls                list apps you can open" },
          { text: "  wallpaper <name>  teal | dusk | slate" },
          { text: "  whoami, neofetch, date, clear, exit" },
          { text: "  There may also be a command called 'recycle'. Just saying." },
        ]);
        break;

      case "about":
        push([
          { text: profile.intro[0] },
          { text: profile.intro[1] },
          { text: "Still exploring. That's the plan, not a bug." },
        ]);
        break;

      case "projects":
        push([
          { text: `${projects.length} project folders found:`, tone: "accent" },
          ...projects.map((project) => ({
            text: `  ${project.fileName.padEnd(28)} ${project.status}`,
          })),
          { text: "Open the Projects window for the full sheets.", tone: "dim" },
        ]);
        break;

      case "skills":
        push([
          ...skillCategories.map((category) => ({
            text: `${category.label}: ${category.skills.map((skill) => skill.name).join(", ")}`,
          })),
          { text: "No percentage bars. They would be invented.", tone: "dim" },
        ]);
        break;

      case "contact":
        push([
          { text: "Email, GitHub and LinkedIn are editable placeholders.", tone: "accent" },
          { text: "Open the Contact window to see the current state." },
        ]);
        break;

      case "whoami":
        push([
          { text: "vraj" },
          { text: "Third-year B.Tech AI & Data Science student at NMIMS MPSTME, Navi Mumbai." },
        ]);
        break;

      case "neofetch":
        push([
          { text: "       ██╗   ██╗ ██████╗ ", tone: "accent" },
          { text: "       ██║   ██║ ██╔══██╗", tone: "accent" },
          { text: "       ██║   ██║ ██████╔╝", tone: "accent" },
          { text: "       ╚██╗ ██╔╝ ██╔══██╗", tone: "accent" },
          { text: "        ╚████╔╝  ██████╔╝", tone: "accent" },
          { text: "         ╚═══╝   ╚═════╝ ", tone: "accent" },
          { text: `OS: ${profile.systemName} ${profile.systemVersion}` },
          { text: `Host: ${profile.institution}` },
          { text: `User: ${profile.name}` },
          { text: "Shell: curiosity 1.0" },
          { text: "Resolution: whatever you set your browser to" },
          { text: "Uptime: still figuring it out" },
        ]);
        break;

      case "ls":
        push([
          { text: "My Computer      About Me       My Projects    Skills" },
          { text: "Beyond Tech      Resume         Contact        Recycle Bin" },
          { text: "Terminal         Display        Notes" },
        ]);
        break;

      case "open": {
        const target = args[0]?.toLowerCase();
        if (!target) {
          push([{ text: "Usage: open <app> — try 'open about' or 'open recycle'.", tone: "error" }]);
          break;
        }
        const appId = aliases[target];
        if (!appId) {
          push([{ text: `No app called '${target}'. Try 'ls'.`, tone: "error" }]);
          break;
        }
        push([{ text: `Opening ${target}...`, tone: "dim" }]);
        openApp(appId);
        break;
      }

      case "wallpaper":
      case "theme": {
        const next = args[0]?.toLowerCase() as WallpaperId | undefined;
        if (next && wallpapers.includes(next)) {
          setWallpaper(next);
          push([{ text: `Wallpaper set to ${next}.`, tone: "accent" }]);
        } else {
          push([
            { text: `Current wallpaper: ${wallpaper}` },
            { text: "Usage: wallpaper teal | dusk | slate", tone: "dim" },
          ]);
        }
        break;
      }

      case "date":
        push([{ text: new Date().toString() }]);
        break;

      case "recycle":
        push([
          { text: binHint, tone: "accent" },
          { text: "Opening the Recycle Bin. Try the files, not the empty button.", tone: "dim" },
        ]);
        openApp("recycle");
        break;

      case "clear":
        setLines([]);
        break;

      case "exit":
        push([{ text: "Closing terminal. The tabs stay open.", tone: "dim" }]);
        window.setTimeout(() => closeWindow(windowId), 180);
        break;

      case "sudo":
        push([{ text: "vraj is not in the sudoers file. This incident has been logged as a learning experience.", tone: "error" }]);
        break;

      case "hello":
      case "hi":
        push([{ text: "Hello. Try 'help' if you're lost, or 'open projects' if you're not." }]);
        break;

      default:
        push([
          { text: `'${base}' is not a command. Try 'help'.`, tone: "error" },
        ]);
        notify(`Terminal: unknown command '${base}'`, "Command not found");
    }

    setHistory((current) => [...current, command]);
    setHistoryIndex(-1);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    runCommand(input);
    setInput("");
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (event.key === "Tab") {
      const match = commandNames.find((command) => command.startsWith(input.toLowerCase()));
      if (match) {
        event.preventDefault();
        setInput(match);
      }
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    <AppShell windowId={windowId} className="terminal-app">
      <div
        className="terminal-screen"
        ref={scrollRef}
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus();
        }}
      >
        <div className="terminal-lines">
          {lines.map((line) => (
            <p key={line.id} className={`terminal-line ${line.tone ? `terminal-line--${line.tone}` : ""}`}>
              {line.text || "\u00a0"}
            </p>
          ))}
        </div>
        <form className="terminal-prompt" onSubmit={onSubmit}>
          <label htmlFor={`terminal-input-${windowId}`}>vraj@vrajos:~$</label>
          <input
            id={`terminal-input-${windowId}`}
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onInputKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal command"
          />
        </form>
      </div>
      <StatusBar left="vraj@vrajos" right="Type help" />
    </AppShell>
  );
}
