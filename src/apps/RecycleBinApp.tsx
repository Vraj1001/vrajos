import { useState, type KeyboardEvent } from "react";
import { RotateCcw, Trash2 } from "lucide-react";
import { AddressBar, AppShell, StatusBar, ToolbarButton } from "../os/AppChrome";
import { useDesktop } from "../os/DesktopContext";
import { SystemIcon } from "../os/SystemIcon";
import { WindowDialog } from "../os/WindowDialog";
import type { IconName } from "../os/types";
import {
  binHint,
  recycleFiles,
  type RecycleFile,
  type RecycleKind,
} from "../content/recycleBin";

const kindIcon: Record<RecycleKind, IconName> = {
  text: "notepad",
  zip: "zip",
  exe: "exe",
  doc: "doc",
  photo: "photo",
  db: "db",
};

const kindLabel: Record<RecycleKind, string> = {
  text: "Text document",
  zip: "Compressed folder",
  exe: "Application",
  doc: "Word document",
  photo: "Image notes",
  db: "Database file",
};

export function RecycleBinApp({ windowId }: { windowId: string }) {
  const { binEmptied, emptyBin, restoreBin, notify, isMobile } = useDesktop();
  const [selectedId, setSelectedId] = useState(recycleFiles[0]?.id ?? "");
  const [openFileId, setOpenFileId] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const [confirmEmpty, setConfirmEmpty] = useState(false);

  const selected = recycleFiles.find((file) => file.id === selectedId) ?? recycleFiles[0];
  const openFile = recycleFiles.find((file) => file.id === openFileId) ?? null;

  const openFileDialog = (file: RecycleFile) => {
    setSelectedId(file.id);
    setRestored(false);
    setOpenFileId(file.id);
  };

  const handleRowKeyDown = (event: KeyboardEvent<HTMLButtonElement>, file: RecycleFile) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openFileDialog(file);
    }
  };

  const closeFileDialog = () => {
    setOpenFileId(null);
    setRestored(false);
  };

  return (
    <AppShell windowId={windowId} className="recycle-app">
      <AddressBar path="Recycle Bin">
        {!binEmptied ? (
          <ToolbarButton
            title="Empty the Recycle Bin"
            onClick={() => setConfirmEmpty(true)}
          >
            <Trash2 size={14} strokeWidth={1.7} />
            <span>Empty bin</span>
          </ToolbarButton>
        ) : (
          <ToolbarButton title="Restore the deleted files" onClick={restoreBin}>
            <RotateCcw size={14} strokeWidth={1.7} />
            <span>Undo empty</span>
          </ToolbarButton>
        )}
      </AddressBar>

      <div className="bin-hint">
        <span className="bin-hint-icon" aria-hidden="true">✦</span>
        <p>{binHint}</p>
        <span className="bin-hint-count">{binEmptied ? "0 files" : `${recycleFiles.length} files`}</span>
      </div>

      {binEmptied ? (
        <div className="bin-empty">
          <SystemIcon name="bin" size={78} />
          <h2>The Recycle Bin is empty.</h2>
          <p>
            Including the career plan. And the sleep schedule. If that was a mistake,
            there is an undo button — a rare luxury in real life.
          </p>
          <button type="button" className="btn btn--primary" onClick={restoreBin}>
            <RotateCcw size={13} strokeWidth={1.8} />
            Undo empty Recycle Bin
          </button>
          <p className="bin-empty-hint">{binHint}</p>
        </div>
      ) : (
        <div className="bin-body">
          <div className="bin-list-column">
            <div className="bin-list-head" aria-hidden="true">
              <span>Name</span>
              <span>Type</span>
              <span>Deleted</span>
            </div>
            <ul className="bin-list" aria-label="Deleted files">
              {recycleFiles.map((file) => (
                <li key={file.id}>
                  <button
                    type="button"
                    className={`bin-row ${selected?.id === file.id ? "is-selected" : ""}`}
                    aria-pressed={selected?.id === file.id}
                    onClick={() => {
                      if (isMobile) {
                        setSelectedId(file.id);
                      } else {
                        setSelectedId(file.id);
                      }
                    }}
                    onDoubleClick={() => openFileDialog(file)}
                    onKeyDown={(event) => handleRowKeyDown(event, file)}
                  >
                    <span className="bin-row-name">
                      <SystemIcon name={kindIcon[file.kind]} size={28} />
                      <span>{file.name}</span>
                    </span>
                    <span className="bin-row-type">{kindLabel[file.kind]}</span>
                    <span className="bin-row-date">{file.deleted}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="bin-tip">
              {isMobile ? "Tap a file to inspect it." : "Double-click any file to open it."} Nothing
              here is actually deleted.
            </p>
          </div>

          <aside className="bin-inspector" aria-label="File preview">
            {selected ? (
              <>
                <div className="bin-inspector-head">
                  <SystemIcon name={kindIcon[selected.kind]} size={48} />
                  <div>
                    <h2>{selected.name}</h2>
                    <p>{kindLabel[selected.kind]}</p>
                  </div>
                </div>
                <dl className="bin-meta">
                  <div>
                    <dt>Size</dt>
                    <dd>{selected.size}</dd>
                  </div>
                  <div>
                    <dt>Original location</dt>
                    <dd>{selected.origin}</dd>
                  </div>
                  <div>
                    <dt>Deleted</dt>
                    <dd>{selected.deleted}</dd>
                  </div>
                </dl>
                <p className="bin-excerpt">{selected.body[0]}</p>
                <button
                  type="button"
                  className="btn btn--primary bin-open"
                  onClick={() => openFileDialog(selected)}
                >
                  Open file
                </button>
                <p className="bin-inspector-note">
                  Restoring is allowed. It rarely helps.
                </p>
              </>
            ) : null}
          </aside>
        </div>
      )}

      <StatusBar
        left={binEmptied ? "0 objects" : `${recycleFiles.length} deleted objects`}
        right={binEmptied ? "Empty" : "Undo available (unlike real life)"}
      />

      {openFile ? (
        <WindowDialog
          title={`${openFile.name} — Deleted`}
          icon={<SystemIcon name={kindIcon[openFile.kind]} size={18} />}
          onClose={closeFileDialog}
          actions={
            <>
              {!restored ? (
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => {
                    setRestored(true);
                    notify(openFile.restoreReply, "Restore attempted");
                  }}
                >
                  Restore
                </button>
              ) : null}
              <button type="button" className="btn" onClick={closeFileDialog}>
                Close
              </button>
            </>
          }
        >
          <div className={`deleted-file deleted-file--${openFile.kind}`}>
            <div className="deleted-file-meta">
              <SystemIcon name={kindIcon[openFile.kind]} size={44} />
              <dl>
                <div>
                  <dt>Type</dt>
                  <dd>{kindLabel[openFile.kind]}</dd>
                </div>
                <div>
                  <dt>Size</dt>
                  <dd>{openFile.size}</dd>
                </div>
                <div>
                  <dt>Deleted</dt>
                  <dd>{openFile.deleted}</dd>
                </div>
              </dl>
            </div>
            <div className="deleted-file-text">
              {openFile.body.map((line, index) => (
                <p key={index} className={line === "" ? "blank-line" : undefined}>
                  {line || "\u00a0"}
                </p>
              ))}
            </div>
            {restored ? (
              <div className="restore-reply">
                <strong>Restore result</strong>
                <p>{openFile.restoreReply}</p>
              </div>
            ) : null}
          </div>
        </WindowDialog>
      ) : null}

      {confirmEmpty ? (
        <WindowDialog
          title="Confirm File Delete"
          icon={<SystemIcon name="bin" size={18} />}
          onClose={() => setConfirmEmpty(false)}
          tone="warning"
          actions={
            <>
              <button
                type="button"
                className="btn"
                onClick={() => setConfirmEmpty(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  emptyBin();
                  setConfirmEmpty(false);
                  notify(
                    "Six files sent to nowhere. The undo button is right there if you miss them.",
                    "Recycle Bin emptied",
                  );
                }}
              >
                Empty Recycle Bin
              </button>
            </>
          }
        >
          <div className="confirm-body">
            <div className="confirm-icon" aria-hidden="true">?</div>
            <div>
              <h3>Empty the Recycle Bin?</h3>
              <p>
                This removes all {recycleFiles.length} files, including a career plan
                that was already on its third final version. You can undo it, because
                this is a portfolio and not your actual computer.
              </p>
            </div>
          </div>
        </WindowDialog>
      ) : null}
    </AppShell>
  );
}
