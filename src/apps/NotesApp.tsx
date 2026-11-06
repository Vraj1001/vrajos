import { useEffect, useState } from "react";
import { AppShell, StatusBar } from "../os/AppChrome";
import { useDesktop } from "../os/DesktopContext";

const defaultNotes = `A note from Vraj
================

Things I'm trying to get better at:
- writing code that someone else can read
- asking one more question before jumping into a solution
- finishing a project before starting the next one
- taking the camera out more often

Things I keep coming back to:
- story-driven games
- film montages with a very specific cut on the beat
- fragrance notes in Indian weather (the humidity wins)
- the walk back, not just the destination

A reminder to myself:
Being a student is allowed to look like unfinished work.
The point is to keep the tabs moving in the right direction.

(You can type in this window. It saves to your browser, not to mine.)`;

const STORAGE_KEY = "vrajos:scratchpad";

export function NotesApp({ windowId }: { windowId: string }) {
  const { notify } = useDesktop();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setText(stored ?? defaultNotes);
      setSaved(stored ?? defaultNotes);
    } catch {
      setText(defaultNotes);
      setSaved(defaultNotes);
    }
  }, []);

  const save = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, text);
      setSaved(text);
      notify("Notes saved in this browser.", "Saved");
    } catch {
      notify("This browser won't let the notes save. The text is still here.", "Save failed");
    }
  };

  const reset = () => {
    setText(defaultNotes);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage restrictions.
    }
    setSaved(defaultNotes);
    notify("The original notes are back.", "Restored");
  };

  const isDirty = text !== saved;

  return (
    <AppShell windowId={windowId} className="notes-app">
      <div className="notes-toolbar">
        <button type="button" className="btn" onClick={save} disabled={!isDirty}>
          Save
        </button>
        <button type="button" className="btn" onClick={reset}>
          Restore original
        </button>
        <span className="notes-status">{isDirty ? "Unsaved changes" : "Saved locally"}</span>
      </div>
      <label className="sr-only" htmlFor={`notes-${windowId}`}>
        Personal notes
      </label>
      <textarea
        id={`notes-${windowId}`}
        className="notes-textarea"
        value={text}
        onChange={(event) => setText(event.target.value)}
        spellCheck={false}
        onKeyDown={(event) => {
          if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
            event.preventDefault();
            save();
          }
        }}
      />
      <StatusBar
        left={`${text.trim().split(/\s+/).filter(Boolean).length} words`}
        right="Stored in your browser"
      />
    </AppShell>
  );
}
