import { create } from "zustand";
import { fileType } from "../interfaces/desktop";

type useCoordsType = {
  coords: {
    x: number;
    y: number;
  };
  setCoords: (obj: { x: number; y: number }) => void;
};

export const useCoords = create<useCoordsType>((set) => ({
  coords: { x: 0, y: 0 },
  setCoords: (obj) => set({ coords: obj }),
}));

type useOpenRightClickType = {
  openRightClick: boolean;
  setOpenRightClick: (arg: boolean) => void;
};

export const useOpenRightClick = create<useOpenRightClickType>((set) => ({
  openRightClick: false,
  setOpenRightClick: (arg) => set({ openRightClick: arg }),
}));

type useDestkopStoreType = {
  desktop: fileType[];
  setDesktop: (array: fileType[]) => void;
};

const defaultDesktop: fileType[] = [
  {
    id: 0,
    title: "new folder",
    type: "folder",
    position: { x: 0, y: 0 },
  },
  {
    id: 1,
    title: "new folder 2",
    type: "folder",
    position: { x: 0, y: 0 },
  },
  {
    id: 2,
    title: "new folder 3",
    type: "folder",
    position: { x: 0, y: 0 },
  },
];

const localDesktop = localStorage.getItem("desktop");

export const useDestkopStore = create<useDestkopStoreType>((set) => ({
  desktop: localDesktop ? JSON.parse(localDesktop) : defaultDesktop,
  setDesktop: (array) => {
    localStorage.setItem("desktop", JSON.stringify(array)),
      set({ desktop: array });
  },
}));

type useDesktopActiveFolderType = {
  active: null | number[];
  setActive: (id: number[]) => void;
  clear: () => void;
};

export const useDesktopActiveFolder = create<useDesktopActiveFolderType>(
  (set) => ({
    active: null,
    setActive: (id) => set({ active: id }),
    clear: () => set({ active: null }),
  })
);

type useDesktopViewOptionsType = {
  auto: boolean;
  showDesktopIcons: boolean;
  iconSize: "large" | "medium" | "small";
};

type useDesktopViewType = {
  options: useDesktopViewOptionsType;
  setType: (obj: useDesktopViewOptionsType) => void;
};

const localOptions = localStorage.getItem("options");

export const useDesktopView = create<useDesktopViewType>((set) => ({
  options: localOptions
    ? JSON.parse(localOptions)
    : { auto: true, showDesktopIcons: true, iconSize: "medium" },
  setType: (obj) => {
    localStorage.setItem("options", JSON.stringify(obj)), set({ options: obj });
  },
}));

type showSelectionType = {
  show: boolean;
  coords: { x: number; y: number } | null;
  select: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null;
};

type useShowSelectionType = {
  showSelection: showSelectionType;
  setShowSelection: (arg: showSelectionType) => void;
};

export const useShowSelection = create<useShowSelectionType>((set) => ({
  showSelection: { show: false, coords: null, select: null },
  setShowSelection: (arg) => set({ showSelection: arg }),
}));
