type appType = "folder";

type appPosition = { x: number; y: number };

export type fileType = {
  id: number;
  title: string;
  type: appType;
  position: appPosition;
};
