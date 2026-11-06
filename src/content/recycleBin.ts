export type RecycleKind = "text" | "zip" | "exe" | "doc" | "photo" | "db";

export type RecycleFile = {
  id: string;
  name: string;
  kind: RecycleKind;
  size: string;
  deleted: string;
  origin: string;
  body: string[];
  restoreReply: string;
};

export const recycleFiles: RecycleFile[] = [
  {
    id: "tabs",
    name: "too_many_tabs_open.txt",
    kind: "text",
    size: "2 KB",
    deleted: "Deleted: this morning",
    origin: "C:\\Users\\Vraj\\Documents",
    body: [
      "Currently researching something that could probably have been answered in three tabs.",
      "There are now 27.",
      "",
      "Two of them are the same article. One is a Wikipedia page about a film I watched last week. I'm keeping all of them open in case I suddenly need them.",
    ],
    restoreReply:
      "Restored. All 27 tabs are back. I hope you're happy with what you've done.",
  },
  {
    id: "side-project",
    name: "another_side_project.zip",
    kind: "zip",
    size: "48 MB",
    deleted: "Deleted: last weekend",
    origin: "C:\\Users\\Vraj\\Projects",
    body: [
      "Started with a small idea. Somehow turned into another weekend project.",
      "",
      "Current status: folder structure created, README written, three files of code, and a very confident name.",
      "",
      "Estimated time to finish: one weekend. This estimate has been renewed four times.",
    ],
    restoreReply:
      "Restored. It's already asking for a new database. Close it before it becomes a startup.",
  },
  {
    id: "sleep",
    name: "sleep_schedule.exe",
    kind: "exe",
    size: "unknown",
    deleted: "Deleted: some time ago",
    origin: "C:\\Windows\\System32",
    body: [
      "File corrupted.",
      "",
      "Last successful execution: unknown.",
      "Error code: 0x00000000 (JUST_ONE_MORE_THING)",
      "",
      "Recommended fix: close the editor, stop watching one more episode, and go to bed. The fix has not been tested.",
    ],
    restoreReply:
      "Restoring failed. The file has been replaced by a browser tab and a documentary at 1 a.m.",
  },
  {
    id: "career",
    name: "career_path_final_FINAL_v3.docx",
    kind: "doc",
    size: "12 KB",
    deleted: "Deleted: 3 revisions ago",
    origin: "C:\\Users\\Vraj\\Desktop",
    body: [
      "Still figuring things out.",
      "",
      "Currently exploring software development, AI, data analytics and whatever interesting thing catches my attention next.",
      "",
      "Note to self: the file name stopped being funny two versions ago. The plan is allowed to change. That's the plan.",
    ],
    restoreReply:
      "Opened in compatibility mode. The document contains 14 track changes and a comment that just says '?'.",
  },
  {
    id: "photos",
    name: "photography_ideas.txt",
    kind: "photo",
    size: "4 KB",
    deleted: "Deleted: before the last trip",
    origin: "C:\\Users\\Vraj\\Pictures",
    body: [
      "Always looking for an interesting frame, whether it's a new place, a car or an ordinary moment with friends.",
      "",
      "Ideas for next time:",
      "01. A quiet road just after the rain.",
      "02. A car detail nobody else notices.",
      "03. Everyone in the frame looking in different directions.",
      "04. The walk back, not the destination.",
    ],
    restoreReply:
      "Restored to Pictures. The camera is already out of charge, as usual.",
  },
  {
    id: "fragrance",
    name: "fragrance_collection.db",
    kind: "db",
    size: "1.2 MB",
    deleted: "Deleted: accidentally",
    origin: "C:\\Users\\Vraj\\Hobbies",
    body: [
      "An ongoing collection of fragrance notes, reviews and experiments with what actually performs well in Indian weather.",
      "",
      "Current observation: a six-hour fragrance is a three-hour fragrance here, and humidity has opinions.",
      "",
      "Known bug: the collection keeps growing faster than the notes get written.",
    ],
    restoreReply:
      "Restored. The database immediately added three fragrances to the wishlist. Unbelievable.",
  },
];

export const binHint =
  "Something interesting might be hiding in the Recycle Bin.";
