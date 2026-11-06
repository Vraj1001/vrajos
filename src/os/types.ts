export type AppId =
  | "computer"
  | "about"
  | "projects"
  | "project"
  | "skills"
  | "beyond"
  | "resume"
  | "contact"
  | "recycle"
  | "terminal"
  | "display"
  | "notes";

export type IconName =
  | "computer"
  | "user"
  | "folder"
  | "projects"
  | "skills"
  | "camera"
  | "resume"
  | "mail"
  | "bin"
  | "terminal"
  | "display"
  | "notepad"
  | "text"
  | "file"
  | "zip"
  | "exe"
  | "doc"
  | "photo"
  | "db";

export type Rect = { x: number; y: number; w: number; h: number };

export type WindowInstance = Rect & {
  id: string;
  appId: AppId;
  payload?: string;
  title: string;
  icon: IconName;
  z: number;
  minimized: boolean;
  maximized: boolean;
  previousRect: Rect | null;
};

export type WallpaperId = "teal" | "dusk" | "slate";

export type AppDefinition = {
  title: string;
  icon: IconName;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  singleton: boolean;
};
